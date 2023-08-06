# coding=utf-8
#
# ROSREPO
# Manage ROS workspaces with multiple Gitlab repositories
#
# Author: Timo Röhling
#
# Copyright 2016 Fraunhofer FKIE
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
#
import os
import sys
import re
import concurrent.futures
from .workspace import get_workspace_location, get_workspace_state, find_catkin_packages, resolve_this
from .config import Config
from .cache import Cache
from .resolver import find_dependees, resolve_system_depends
from .ui import TableView, msg, warning, error, fatal, escape, show_conflicts, show_missing_system_depends
from .util import iteritems, path_has_prefix, call_process
from .git import Git, Repo, GitError


def need_push(local_branch, remote_branch=None):
    if local_branch is None:
        return False
    if remote_branch is None:
        remote_branch = local_branch.tracking_branch
    if remote_branch is None:
        return False
    return local_branch.commit != remote_branch.commit and remote_branch.is_ancestor(local_branch)


def need_pull(local_branch, remote_branch=None):
    if local_branch is None:
        return False
    if remote_branch is None:
        remote_branch = local_branch.tracking_branch
    if remote_branch is None:
        return False
    return local_branch.commit != remote_branch.commit and local_branch.is_ancestor(remote_branch)


def is_up_to_date(local_branch, remote_branch=None):
    if local_branch is None:
        return False
    if remote_branch is None:
        remote_branch = local_branch.tracking_branch
    if remote_branch is None:
        return False
    return local_branch.commit == remote_branch.commit


def get_origin(repo, project):
    for r in repo.remotes:
        for _, url in iteritems(project.url):
            if r.url == url:
                return r
    return None


def show_status(srcdir, packages, projects, other_git, ws_state, show_up_to_date=True, cache=None):
    def create_upstream_status(repo, master_branch, master_remote_branch, tracking_branch):
        status = []
        if not repo.detached_head() and not repo.merge_head:
            if tracking_branch is not None:
                if master_remote_branch is not None:
                    if tracking_branch.remote != master_remote_branch.remote:
                        status.append("@!@{rf}remote '%s'" % tracking_branch.remote)
                if need_push(repo.head.reference):
                    status.append("@!@{yf}needs push")
                elif need_pull(repo.head.reference):
                    status.append("@!@{cf}needs pull")
                elif not is_up_to_date(repo.head.reference):
                    status.append("@!@{yf}needs pull -M")
            else:
                status.append("@!branch '%s'" % repo.head.reference)
                if master_branch is None:
                    status.append("@!@{rf}no remote")
                if is_up_to_date(master_branch) or need_push(master_branch):
                    if need_pull(repo.head, master_branch):
                        status.append("@!@{cf}needs pull -L")
                    else:
                        if not master_branch.is_ancestor(repo.head):
                            status.append("@!@{yf}needs merge --from-master")
                        if not is_up_to_date(repo.head, master_branch):
                            status.append("@!@{yf}needs merge --to-master")
            if master_branch is not None and master_remote_branch is not None and tracking_branch != master_remote_branch:
                if need_push(master_branch):
                    status.append("@!@{yf}%s needs push" % master_branch)
                elif need_pull(master_branch):
                    status.append("@!@{cf}%s needs pull" % master_branch)
                elif not is_up_to_date(master_branch):
                    status.append("@!@{yf}%s needs merge" % master_branch)
        return status

    def create_local_status(repo, upstream_status, workspace_path=None):
        status = []
        if repo.detached_head():
            status.append("@!@{rf}detached HEAD")
            return status
        if repo.merge_head:
            if repo.conflicts(workspace_path):
                status.append("@!@{rf}merge conflicts")
            else:
                status.append("@!@{yf}merged, needs commit")
            return status
        if repo.is_dirty(workspace_path):
            status.append("@!@{yf}needs commit")
        status += upstream_status
        if not status:
            if not show_up_to_date:
                return None
            if master_remote_branch is not None and master_remote_branch != tracking_branch:
                status.append("@!@{gf}up-to-date@|(%s)" % tracking_branch)
            else:
                status.append("@!@{gf}up-to-date")
        return status

    table = TableView("Package", "Path", "Status")

    found_packages = set()
    for project in projects:
        repo = Repo(os.path.join(srcdir, project.workspace_path))
        master_remote = get_origin(repo, project)
        if master_remote is not None:
            master_remote_branch = master_remote[project.master_branch]
            master_branch = next((b for b in repo.heads if b.tracking_branch == master_remote_branch), None)
        else:
            master_remote_branch = None
            master_branch = None
        if not repo.detached_head():
            tracking_branch = repo.head.reference.tracking_branch
        else:
            tracking_branch = None
        ws_packages = find_catkin_packages(srcdir, project.workspace_path, cache=cache)
        found_packages |= set(ws_packages.keys())
        upstream_status = create_upstream_status(repo, master_branch, master_remote_branch, tracking_branch)
        for name, pkg_list in iteritems(ws_packages):
            if name not in packages:
                continue
            for pkg in pkg_list:
                status = create_local_status(repo, upstream_status, os.path.relpath(pkg.workspace_path, project.workspace_path))
                if status is not None:
                    head, tail = os.path.split(pkg.workspace_path)
                    path = escape(head + "/" if tail == name else pkg.workspace_path)
                    table.add_row(escape(name), path, status)

    for path in other_git:
        repo = Repo(os.path.join(srcdir, path))
        tracking_branch = repo.head.reference.tracking_branch
        ws_packages = find_catkin_packages(srcdir, path, cache=cache)
        found_packages |= set(ws_packages.keys())
        upstream_status = create_upstream_status(repo, None, None, tracking_branch)
        for name, pkg_list in iteritems(ws_packages):
            if name not in packages:
                continue
            for pkg in pkg_list:
                status = create_local_status(repo, upstream_status, os.path.relpath(pkg.workspace_path, path))
                if status is not None:
                    head, tail = os.path.split(pkg.workspace_path)
                    path = escape(head + "/" if tail == name else pkg.workspace_path)
                    table.add_row(escape(name), path, status)

    missing = set(packages) - found_packages
    for name in missing:
        path_list = []
        if name in ws_state.ws_packages:
            for pkg in ws_state.ws_packages[name]:
                head, tail = os.path.split(pkg.workspace_path)
                path_list.append(escape(head + "/" if tail == name else pkg.workspace_path))
        table.add_row(escape(name), path_list, "no git")
    if table.empty():
        if found_packages:
            msg("Everything is @!@{gf}up-to-date@|.\n")
        else:
            warning("no Git repositories\n")
    else:
        table.sort(0)
        table.write(sys.stdout)


def has_package_path(obj, paths):
    for path in paths:
        if path_has_prefix(path, obj.workspace_path if hasattr(obj, "workspace_path") else obj):
            return True
    return False


def update_projects(srcdir, packages, projects, other_git, ws_state, update_op, jobs, dry_run=False, action="update", fetch_remote=True):

    def fetch_project(project):
        repo = Repo(os.path.join(srcdir, project.workspace_path))
        master_remote = get_origin(repo, project)
        if master_remote is not None:
            master_remote_branch = master_remote[project.master_branch]
            master_branch = next((b for b in repo.heads if b.tracking_branch == master_remote_branch), None)
        else:
            master_branch = None
        tracking_branch = repo.head.reference.tracking_branch
        tracking_remote = tracking_branch.remote if tracking_branch is not None else None
        if fetch_remote and master_remote is not None:
            msg("@{cf}Fetching@|: %s\n" % escape(master_remote.url))
            master_remote.fetch(prune=True, simulate=dry_run, console=True)
        if fetch_remote and tracking_remote is not None and master_remote != tracking_remote:
            msg("@{cf}Fetching@|: %s\n" % escape(tracking_remote.url))
            tracking_remote.fetch(prune=True, simulate=dry_run, console=True)
        return repo, master_branch, tracking_branch

    def fetch_other_git(path):
        repo = Repo(os.path.join(srcdir, path))
        tracking_branch = repo.head.reference.tracking_branch
        if fetch_remote and tracking_branch is not None:
            tracking_remote = tracking_branch.remote
            msg("@{cf}Fetching@|: %s\n" % escape(tracking_remote.url))
            tracking_remote.fetch(simulate=dry_run, console=True)
        return repo, None, tracking_branch

    with concurrent.futures.ThreadPoolExecutor(max_workers=jobs) as executor:
        future_to_path = {}
        future_to_path.update({executor.submit(fetch_project, project): project.workspace_path for project in projects})
        future_to_path.update({executor.submit(fetch_other_git, path): path for path in other_git})
        for future in concurrent.futures.as_completed(future_to_path):
            path = future_to_path[future]
            try:
                repo, master_branch, tracking_branch = future.result()
                update_op(repo, master_branch, tracking_branch)
            except Exception as e:
                error("cannot %s '%s': %s\n" % (action, escape(path), escape(str(e))))
    show_status(srcdir, packages, projects, other_git, ws_state, show_up_to_date=False)


def pull_projects(srcdir, packages, projects, other_git, ws_state, jobs, update_local=False, merge=False, dry_run=False):
    def do_pull(repo, master_branch, tracking_branch):
        if repo.merge_head:
            raise GitError("unfinished merge detected")
        if tracking_branch is not None:
            if need_pull(repo.head, tracking_branch):
                stdout = repo.git.log(r"--pretty=%h [%an] %s", "%s..%s" % (repo.head.reference, tracking_branch), "--", simulate=dry_run)
                msg(stdout, indent_first=2, indent_next=10)
                repo.git.merge(tracking_branch, ff_only=True, on_fail="conflicts", simulate=dry_run, console=True)
            elif repo.head.commit != tracking_branch.commit and merge:
                stdout = repo.git.log(r"--pretty=%h [%an] %s", "%s..%s" % (repo.head.reference, tracking_branch), "--", simulate=dry_run)
                msg(stdout, indent_first=2, indent_next=10)
                robust_merge(repo, tracking_branch, m="Merge changes from %s into %s" % (tracking_branch, repo.head.reference), on_fail="conflicts", simulate=dry_run, console=True)
        if master_branch is not None:
            if repo.head.reference != master_branch and need_pull(master_branch):
                stdout = repo.git.log(r"--pretty=%h [%an] %s", "%s..%s" % (master_branch, master_branch.tracking_branch), "--", simulate=dry_run)
                msg(stdout, indent_first=2, indent_next=10)
                with repo.temporary_stash(simulate=dry_run):
                    repo.git.checkout(master_branch, simulate=dry_run)
                    repo.git.merge(master_branch.tracking_branch, ff_only=True, on_fail="conflicts", simulate=dry_run, console=True)
            if update_local and (is_up_to_date(master_branch) or need_push(master_branch)) and need_pull(repo.head, master_branch):
                stdout = repo.git.log(r"--pretty=%h [%an] %s", "%s..%s" % (repo.head.reference, master_branch), "--", simulate=dry_run)
                msg(stdout, indent_first=2, indent_next=10)
                repo.git.merge(master_branch, ff_only=True, on_fail="conflicts", simulate=dry_run, console=True)

    update_projects(srcdir, packages, projects, other_git, ws_state, do_pull, dry_run=dry_run, action="pull", jobs=jobs)


def push_projects(srcdir, packages, projects, other_git, ws_state, jobs, dry_run=False):
    def do_push(repo, master_branch, tracking_branch):
        if repo.merge_head:
            raise GitError("unfinished merge detected")
        if tracking_branch is not None and need_push(repo.head, tracking_branch):
            stdout = repo.git.log(r"--pretty=%h [%an] %s", "%s..%s" % (tracking_branch, repo.head.reference), "--", simulate=dry_run)
            msg(stdout, indent_first=2, indent_next=10)
            repo.git.push(tracking_branch.remote, "%s:%s" % (repo.head.reference, tracking_branch.branch_name), simulate=dry_run, console=True)
        if master_branch is not None and repo.head.reference != master_branch and need_push(master_branch):
            stdout = repo.git.log(r"--pretty=%h [%an] %s", "%s..%s" % (master_branch.tracking_branch, master_branch), "--", simulate=dry_run)
            msg(stdout, indent_first=2, indent_next=10)
            repo.git.push(master_branch.tracking_branch.remote, "%s:%s" % (master_branch, master_branch.tracking_branch.branch_name), simulate=dry_run, console=True)

    update_projects(srcdir, packages, projects, other_git, ws_state, do_push, dry_run=dry_run, action="push", jobs=jobs)


def commit_projects(srcdir, packages, projects, other_git, ws_state, dry_run=False):
    def do_commit(repo, master_branch, tracking_branch):
        if repo.merge_head:
            raise GitError("unfinished merge detected")
        if repo.is_dirty():
            msg("@{cf}Commit@| %s\n" % repo.workspace)
            invoke = ["git-cola", "--repo", repo.workspace]
            if dry_run:
                msg("@{cf}Invoking@|: %s\n" % " ".join(invoke))
            else:
                call_process(invoke)

    update_projects(srcdir, packages, projects, other_git, ws_state, do_commit, dry_run=dry_run, fetch_remote=False, action="commit", jobs=1)


def robust_merge(repo, *args, **kwargs):
    try:
        repo.git.merge(*args, **kwargs)
    except GitError:
        if repo.conflicts():
            invoke = ["git", "-C", repo.workspace, "mergetool"]
            if kwargs.get("dry_run", False):
                msg("@{cf}Invoking@|: %s\n" % " ".join(invoke))
            else:
                call_process(invoke)
        else:
            raise
        if not repo.conflicts():
            repo.git.commit(m=kwargs.get("m", kwargs.get("message", None)))
        else:
            raise


def merge_projects(srcdir, packages, projects, other_git, ws_state, args):
    def do_merge(repo, master_branch, tracking_branch):
        if args.abort:
            repo.git.merge(abort=True, simulate=args.dry_run)
            return
        if args.resolve:
            repo.git.mergetool()
            return
        if repo.merge_head:
            raise GitError("unfinished previous merge")
        if master_branch is None:
            return
        if repo.head.commit == master_branch.commit:
            return
        if tracking_branch is not None:
            if tracking_branch.remote != master_branch.tracking_branch.remote:
                raise GitError("will not merge with foreign tracking branch")
        if master_branch.commit != master_branch.tracking_branch.commit and not need_push(repo, master_branch.tracking_branch, master_branch):
            raise GitError("will not merge with outdated master branch")
        if args.from_master or args.sync:
            msg("@{cf}Merging@| %s: %s into %s\n" % (os.path.relpath(repo.workspace, srcdir), master_branch, repo.head.reference))
            robust_merge(repo, master_branch, m="Merge changes from %s into %s" % (master_branch, repo.head.reference), on_fail="conflicts", simulate=args.dry_run)
        if args.to_master or args.sync:
            with repo.temporary_stash(simulate=args.dry_run):
                active_branch = repo.head.reference
                repo.git.checkout(master_branch, simulate=args.dry_run)
                msg("@{cf}Merging@| %s: %s into %s\n" % (os.path.relpath(repo.workspace, srcdir), active_branch, master_branch))
                robust_merge(repo, active_branch, m="Merge changes from %s into %s" % (active_branch, master_branch), on_fail="conflicts", simulate=args.dry_run)
    if (args.from_master or args.to_master) and not args.packages:
        fatal("you must explicitly list packages for merge operations")
    update_projects(srcdir, packages, projects, other_git, ws_state, do_merge, dry_run=args.dry_run, action="merge", fetch_remote=not args.abort and not args.resolve, jobs=1)


def compute_git_subdir(srcdir, name):
    index = 1
    result = name
    while os.path.isdir(os.path.join(srcdir, result)):
        index += 1
        result = "%s-%d" % (name, index)
    return result


def clone_packages(srcdir, packages, ws_state, protocol="ssh", offline_mode=False, dry_run=False):
    need_cloning = [(n, p) for n, p in iteritems(packages) if n not in ws_state.ws_packages and p.project not in ws_state.ws_projects]
    if not need_cloning:
        return False
    msg("@{cf}The following packages have to be cloned from Gitlab@|:\n")
    msg(escape(", ".join(sorted(n for n, _ in need_cloning)) + "\n\n"), indent=4)
    if offline_mode:
        fatal("cannot clone projects in offline mode\n")
    projects = list(set(p.project for _, p in need_cloning))
    for project in projects:
        git_subdir = compute_git_subdir(srcdir, project.server_path)
        if protocol not in project.url:
            fatal("unsupported procotol type: %s\n" % protocol)
        msg("@{cf}Cloning@|: %s\n" % escape(project.url[protocol]))
        Git(srcdir).clone(project.url[protocol], git_subdir, simulate=dry_run, console=True)
        msg("\n")
    return True


def remote_projects(srcdir, packages, projects, other_git, ws_state, args):
    if args.move_host:
        old_host, new_host = args.move_host
        for path in [project.workspace_path for project in projects] + other_git:
            repo = Repo(os.path.join(srcdir, path))
            for remote in repo.remotes:
                old_url = remote.url
                new_url = re.sub("([/@])%s([/:])" % old_host.replace(".", "\\."), "\\1%s\\2" % new_host, old_url)
                if old_url != new_url:
                    msg("@{cf}Updating@|: %s @!->@| %s\n" % (old_url, new_url), indent_next=10)
                    if not args.dry_run:
                        remote.url = new_url
    if args.protocol:
        for project in projects:
            repo = Repo(os.path.join(srcdir, project.workspace_path))
            master_remote = get_origin(repo, project)
            old_url = master_remote.url
            new_url = project.url.get(args.protocol, old_url)
            if old_url != new_url:
                msg("@{cf}Updating@|: %s @!->@| %s\n" % (old_url, new_url), indent_next=10)
                if not args.dry_run:
                    master_remote.url = new_url


def run(args):
    wsdir = get_workspace_location(args.workspace)
    config = Config(wsdir)
    cache = Cache(wsdir)
    srcdir = os.path.join(wsdir, "src")
    ws_state = get_workspace_state(wsdir, config, cache=cache, offline_mode=args.offline)
    if args.git_cmd == "clone":
        if args.all:
            args.packages = set(ws_state.ws_packages.keys() + ws_state.remote_packages.keys())
        if not args.packages:
            fatal("no packages specified")
        depends, system_depends, conflicts = find_dependees(args.packages, ws_state, auto_resolve=False, ignore_missing=args.ignore_missing_depends)
        if conflicts:
            show_conflicts(conflicts)
            fatal("cannot resolve dependencies\n")
        if not clone_packages(srcdir, depends, ws_state, protocol=args.protocol or config.get("git_default_transport", "ssh"), offline_mode=args.offline, dry_run=args.dry_run):
            warning("already in workspace\n")
        missing = resolve_system_depends(ws_state, system_depends, missing_only=True)
        show_missing_system_depends(missing)
        return 0

    if args.this:
        args.packages = resolve_this(wsdir, ws_state)
    if args.packages:
        for p in args.packages:
            if p not in ws_state.ws_packages:
                fatal("package '%s' is not in workspace\n" % escape(p))
        if args.with_depends:
            packages, _, conflicts = find_dependees(args.packages, ws_state)
            show_conflicts(conflicts)
        else:
            packages = set(args.packages)
        if args.git_cmd == "status":
            args.all = True
        paths = []
        for name in packages:
            paths += [p.workspace_path for p in ws_state.ws_packages[name]]
        projects = [p for p in ws_state.ws_projects if has_package_path(p, paths)]
        other_git = [g for g in ws_state.other_git if has_package_path(g, paths)]
    else:
        packages = set(ws_state.ws_packages.keys())
        projects = ws_state.ws_projects
        other_git = ws_state.other_git
    if args.git_cmd == "status":
        show_status(srcdir, packages, projects, other_git, ws_state, show_up_to_date=args.all, cache=cache)
    if args.git_cmd == "pull":
        pull_projects(srcdir, packages, projects, other_git, ws_state, jobs=args.jobs, update_local=args.update_local, merge=args.merge, dry_run=args.dry_run)
    if args.git_cmd == "push":
        push_projects(srcdir, packages, projects, other_git, ws_state, jobs=args.jobs, dry_run=args.dry_run)
    if args.git_cmd == "merge":
        merge_projects(srcdir, packages, projects, other_git, ws_state, args=args)
    if args.git_cmd == "commit":
        commit_projects(srcdir, packages, projects, other_git, ws_state, dry_run=args.dry_run)
    if args.git_cmd == "remote":
        remote_projects(srcdir, packages, projects, other_git, ws_state, args=args)
    return 0
