---
name: license-check
description: Validate the licenses of pyplan-docs' third-party npm dependencies with legal/third-party-licenses/license-check.mjs, and keep its README state up to date. Use it, without being asked, whenever a change adds, upgrades or removes an npm package (npm install/uninstall/update, Docusaurus upgrades, edits to package.json or package-lock.json), and before handing over such a change. Also use it when asked to check, validate or review licenses ("revisar licencias", "validar la licencia de esta librería").
---

# License check

The license check does not run in the GitHub workflows: whoever changes a dependency runs it
before handing the change over. This skill runs it, explains the result and fixes what is
mechanical. Decisions about licenses are the user's.

Run everything from the repo root with the Node of `.node-version`. No `npm install` is needed:
the tool reads `package-lock.json` and asks the npm registry for the license of each exact
version. The first run takes about a minute; answers are cached in
`~/.cache/pyplan-license-check`.

## 1. Run the check against the branch base

```bash
base=$(git merge-base HEAD origin/main)
node legal/third-party-licenses/license-check.mjs check --base "$base"
```

`--base` lists what the branch adds against `main`: new packages and packages that move from dev
to production, each with its version and license. It reads the working tree, so uncommitted
lockfile changes count. Production is every package of `package-lock.json` without
`"dev": true`, optional and peer packages included.

If the change touched `legal/third-party-licenses/` itself, also run its tests:
`node --test legal/third-party-licenses/tests/*.test.mjs`.

## 2. Act on the exit code

- **0 — `Resultado: OK`.** Go to step 3.
- **2 — could not run** (invalid config, a lockfile without `packages`, npm unreachable after
  retries). Retry once; if it persists, tell the user and stop. Never treat it as a pass.
- **1 — blocked.** Two different causes, both printed:
  - **`Estado actual` is stale.** Run `check --update-readme` and include
    `legal/third-party-licenses/README.md` in the change. This is expected whenever a license
    family, an exception or a correction changes, and needs no decision.
  - **`BLOQUEA: <package>@<version>`**: a production dependency is strong copyleft (GPL), network
    copyleft (AGPL, SSPL, RSAL), commercial or has no license, and no `allowlist.json` entry
    covers it. Do not add an exception on your own. Tell the user the package, its license, who
    pulls it in (`npm explain <package>`) and the options:
    1. use another package, or the last version with an acceptable license;
    2. if npm declares the license wrong (read the package's own `LICENSE` in its repository),
       correct it in `overrides.json` with the **exact version** as key and the reason;
    3. if the license is acceptable for Pyplan (for example, an optional or peer package that is
       installed but never reaches the site), add an exception to `allowlist.json` with a major
       pattern (`package@2.*`) and the reason, to be approved in the PR.

    After the user chooses, apply it and run the check again until it exits 0.

## 3. Report

Tell the user, briefly:
- the packages the branch adds or moves to production, with their license;
- any weak copyleft in production — it doesn't block, but the user should know;
- whether the README was regenerated.

This repository is public: keep `legal/third-party-licenses/` to the generated state and the
use of the tool, with no internal or legal notes. Do not commit; the caller handles git.
