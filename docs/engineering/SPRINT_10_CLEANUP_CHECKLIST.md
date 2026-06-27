# Sprint 10 Cleanup Checklist

After post-publish verification, clean up local test files.

## Remove temporary install test

From PowerShell:

```powershell
cd D:\MyWork
Remove-Item nohardtext-install-test -Recurse -Force
```

## Remove accidental repo src folder

If `D:\MyWork\nohardtext\src` was created during manual testing, remove it:

```powershell
cd D:\MyWork\nohardtext
Remove-Item src -Recurse -Force -ErrorAction SilentlyContinue
```

## Check git status

```powershell
git status
```

Only intentional documentation or package metadata changes should be staged.

## Recommended final checks

```powershell
pnpm build
pnpm test
pnpm release:version
pnpm release:check
pnpm release:pack
pnpm release:rc
pnpm release:publish-plan
```
