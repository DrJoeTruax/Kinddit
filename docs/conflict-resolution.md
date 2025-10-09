# Resolving Pending Merge Conflicts in the Kinddit Frontend

When GitHub reports conflicts for files such as `README.md`, `apps/frontend/next.config.js`, or `apps/frontend/package.json`, use the following workflow to resolve them locally before completing the pull request.

1. **Start from a clean working tree**
   ```bash
   git status
   ```
   Ensure there are no staged or unstaged changes. If there are, either commit them or stash them before continuing.

2. **Fetch and check out the feature branch**
   ```bash
   git fetch origin
   git checkout work
   ```
   Replace `work` with the branch that contains the latest iteration of the frontend. This branch should include the desired updates to the Next.js app.

3. **Create a safety backup branch**
   ```bash
   git checkout -b backup/resolve-conflicts-$(date +%Y%m%d)
   ```
   This preserves the current tree before applying conflict resolution so you can restore it if needed.

4. **Merge the target branch and accept "theirs" during conflicts**
   ```bash
   git merge origin/main
   ```
   When Git pauses with conflict markers, prefer the latest frontend implementation by checking out the `--theirs` version of each file, for example:
   ```bash
   git checkout --theirs README.md
   git checkout --theirs apps/frontend/next.config.js
   git checkout --theirs apps/frontend/package.json
   ```
   Repeat this for every file listed in the conflict summary.

5. **Inspect and stage the resolved files**
   ```bash
   git diff
   git add README.md apps/frontend/next.config.js apps/frontend/package.json
   ```
   Confirm that the resulting content matches the intended state from the feature branch.

6. **Commit the merge**
   ```bash
   git commit
   ```
   Provide a message such as `Merge branch 'main' into work` to document the conflict-free merge.

7. **Push and update the pull request**
   ```bash
   git push origin work
   ```
   GitHub will automatically update the pull request, now showing a clean merge-ready state.

Following this process ensures the conflicts are resolved in favor of the new Kinddit frontend while maintaining a recoverable backup.
