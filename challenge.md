Challenge:
1. Continue from the repo you finished in the CI course.
2. Make sure you have a private Docker Hub repo named `cicd`.
3. Make sure your GitHub repo still has:
   - `DOCKERHUB_USERNAME` as a repository variable
   - `DOCKERHUB_TOKEN` as a repository secret
4. In your local repo, create a new branch from `main` and switch to it.
5. Delete the current project files from your local repo, but do not delete the `.git` folder.
6. Download this scrim's files as a zip, unzip them, and copy them into your local repo.
7. Re-create any files that did not come through in the zip. Likely files:
   - `.github/workflows/cicd.yml`
   - `.prettierrc`
   - `.dockerignore`
   - `.gitignore`
   - `.prettierignore`
8. Double check that your local file names and folder structure match the scrim.
9. Run `npm ci` to install a clean set of dependencies from the updated `package-lock.json`.
10. Run:
   - `npm run format`
   - `npm run format:check`
   - `npm run lint`
   - `npm test`
11. Commit the new files and push your branch to GitHub.
12. Open a pull request into `main` and verify that the CI job passes.
13. Merge the pull request and verify that the Deploy job passes.