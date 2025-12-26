---
name: release
description: Release workflow for kasoa monorepo. Commit changes, create changeset, push, merge Version PR, verify npm publish.
---

# Release Workflow

This monorepo uses changesets + OIDC trusted publishing for npm releases.

## Workflow

### 1. Check changes

```bash
git status && git diff && git diff --cached
```

### 2. Commit code change

Stage relevant files only. Use conventional commits:

- `fix(package-name): description` - bug fixes, config tweaks
- `feat(package-name): description` - new features
- `chore: description` - maintenance, deps

### 3. Create changeset

Write `.changeset/<descriptive-name>.md`:

```markdown
---
"<package-name-from-package.json>": patch
---

Brief description of the change
```

Find package names by checking `packages/*/package.json` for the `name` field.

**Semver (pre-1.0):**

- `patch` - bug fixes, config tweaks, docs
- `minor` - new features, breaking changes
- `major` - reserved for post-1.0

### 4. Commit and push

```bash
git add .changeset/<name>.md && git commit -m "chore: add changeset"
git pull --rebase && git push origin main
```

Always rebase before push—remote may have Version PR merges.

### 5. Monitor CI and merge Version PR

Poll until CI passes:

```bash
gh run list --limit 3
```

Check for Version PR:

```bash
gh pr list
```

Merge when PR CI passes:

```bash
gh pr merge <number> --rebase
```

**Important:** This repo only allows rebase merges. `--squash` and `--merge` will fail.

### 6. Verify release

```bash
npm view <package-name> version
gh release list --limit 2
```

## Edge Cases

### Multiple packages changed

One changeset can list multiple packages:

```markdown
---
"<package-a>": patch
"<package-b>": patch
---

Description of changes affecting both packages
```

### Push rejected (remote ahead)

```bash
git pull --rebase && git push origin main
```

### CI fails

Check logs:

```bash
gh run view <run-id> --log-failed
```

## Configuration Reference

- **Changeset config:** `.changeset/config.json` - `baseBranch: main`, `access: public`, `commit: true`
- **CI workflow:** `.github/workflows/ci-and-release.yml`
- **npm auth:** OIDC trusted publishing (no NPM_TOKEN needed)
