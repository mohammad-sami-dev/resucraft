# Open Source Contribution Workflow (GitHub Fork Model)

This is a practical step-by-step guide for contributing to a public repository using a fork.

## 1) One-time setup (first contribution to a repo)

1. Fork the target repo on GitHub.
2. Clone your fork locally:

```powershell
git clone https://github.com/<your-username>/<repo>.git
cd <repo>
```

3. Add original repo as `upstream`:

```powershell
git remote add upstream https://github.com/<owner>/<repo>.git
git remote -v
```

You should see:
- `origin` -> your fork
- `upstream` -> original repo

## 2) Start a new contribution (every time)

Always sync first, then create a fresh branch:

```powershell
git checkout main
git fetch upstream
git pull upstream main
git push origin main

git checkout -b fix/<short-issue-name>
```

Example branch: `fix/homepage-doc-link`

## 3) Make and verify changes

Edit only needed files, then check:

```powershell
git status
git diff
```

Stage and commit:

```powershell
git add <file1> <file2>
git commit -m "fix: short clear message"
```

Push branch:

```powershell
git push -u origin fix/<short-issue-name>
```

## 4) Create PR

On GitHub, open PR from:
- `your-username:fix/<branch>` -> `owner:main`

PR checklist:
- Clear title (`fix: add docs link on homepage`)
- Short description (what changed)
- Link issue with `Closes #<issue-number>`

## 5) If maintainer asks changes

Make edits on same branch, then:

```powershell
git add .
git commit -m "fix: address review feedback"
git push
```

PR updates automatically.

## 6) If PR shows conflicts with main

Rebase your branch on latest upstream main:

```powershell
git fetch upstream
git rebase upstream/main
```

Resolve conflicts in files, then:

```powershell
git add <resolved-files>
git rebase --continue
```

Push rebased branch:

```powershell
git push --force-with-lease origin <your-branch>
```

## 7) Second (or later) contribution to same repo

Yes, you should sync from `upstream` again before starting new work.

```powershell
git checkout main
git fetch upstream
git pull upstream main
git push origin main

git checkout -b fix/<new-issue-name>
```

Do not reuse an old branch for a different issue.

## 8) Good practices

- Keep PRs small and focused.
- Change only files related to issue.
- Avoid mixing formatting-only changes with feature fix.
- Use meaningful commit messages.
- Be polite in comments and wait for maintainer review.

## 9) Quick troubleshooting

- `Everything up-to-date` on push:
  - Remote already has your latest commit.
- Vercel/CI permission errors on someone else’s repo:
  - Usually maintainer-side, not your fault.
- Issue closed but PR still open:
  - Maintainer may have solved issue separately; ask if they still want your PR merged.

---

Use this as your repeatable workflow for all future open-source PRs.
