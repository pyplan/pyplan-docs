import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import {
  CheckError,
  classify,
  COMMERCIAL,
  fetchJson,
  loadPackageLock,
  NETWORK,
  PERMISSIVE,
  README_BEGIN,
  README_COMMAND,
  README_END,
  REVIEW,
  runCheck,
  STRONG,
  WEAK
} from '../license-check.mjs'

const packageLock = (packages) =>
  JSON.stringify({
    name: 'demo',
    lockfileVersion: 3,
    requires: true,
    packages: { '': { name: 'demo', dependencies: { app: '^1.0.0' } }, ...packages }
  })

const PACKAGES = {
  'node_modules/app': { version: '1.0.0', dependencies: { shared: '^2.0.0' } },
  'node_modules/shared': { version: '2.0.0' },
  'node_modules/alias': { name: 'real-name', version: '4.1.0' },
  'node_modules/optional-engine': { version: '1.0.0', optional: true },
  'node_modules/@scope/peer': { version: '1.0.0', peer: true },
  'node_modules/compiler': { version: '7.0.0', devOptional: true },
  'node_modules/app/node_modules/inner': { version: '1.0.0' },
  'node_modules/inner': { version: '2.0.0', dev: true },
  'node_modules/jest': { version: '29.0.0', dev: true },
  'node_modules/local': { link: true, resolved: 'packages/local' },
  'packages/local': { version: '0.0.1' }
}
const LICENSES = {
  app: 'MIT',
  shared: 'ISC',
  'real-name': 'Apache-2.0',
  'optional-engine': 'MIT',
  '@scope/peer': 'MIT',
  compiler: 'MIT',
  inner: 'GPL-3.0-only',
  jest: 'GPL-3.0-only',
  leftpad: 'WTFPL'
}

const fakeRegistry = async (url) => {
  const [name] = url.replace('https://registry.npmjs.org/', '').split('/')
  const decoded = decodeURIComponent(name)
  return decoded in LICENSES ? { license: LICENSES[decoded] } : null
}

const writeJson = (file, value) => writeFileSync(file, JSON.stringify(value))

const withRepo = async (run) => {
  const root = mkdtempSync(join(tmpdir(), 'license-check-'))
  const dir = join(root, 'legal', 'third-party-licenses')
  mkdirSync(dir, { recursive: true })
  writeJson(join(dir, 'config.json'), { project: 'demo', lock: 'package-lock.json' })
  writeFileSync(join(root, 'package-lock.json'), packageLock(PACKAGES))
  const lines = []
  const repo = {
    root,
    dir,
    lines,
    output: () => lines.join('\n'),
    readme: () => readFileSync(join(dir, 'README.md'), 'utf8'),
    write: (name, value) => writeJson(join(dir, name), value),
    writeLock: (packages) => writeFileSync(join(root, 'package-lock.json'), packageLock(packages)),
    check: (options = {}) =>
      runCheck({
        configPath: join(dir, 'config.json'),
        base: '',
        fetcher: fakeRegistry,
        log: (line = '') => lines.push(line),
        ...options
      })
  }
  try {
    await run(repo)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

test('production is every package without dev, optional and peer ones included', () => {
  const packages = loadPackageLock(packageLock(PACKAGES))
  const scopes = Object.fromEntries([...packages].map(([key, pkg]) => [key, pkg.scope]))

  assert.deepEqual(scopes, {
    'app@1.0.0': 'prod',
    'shared@2.0.0': 'prod',
    'real-name@4.1.0': 'prod',
    'optional-engine@1.0.0': 'prod',
    '@scope/peer@1.0.0': 'prod',
    'compiler@7.0.0': 'prod',
    'inner@1.0.0': 'prod',
    'inner@2.0.0': 'dev',
    'jest@29.0.0': 'dev'
  })
})

test('a lockfile without "packages" cannot be read', () => {
  const v1 = JSON.stringify({ lockfileVersion: 1, dependencies: {} })

  assert.throws(() => loadPackageLock(v1), CheckError)
  assert.throws(() => loadPackageLock('{'), CheckError)
})

test('classifies license expressions by their riskiest required term', () => {
  const cases = {
    MIT: PERMISSIVE,
    'MIT OR GPL-3.0-only': PERMISSIVE,
    '(MIT OR GPL-3.0-only)': PERMISSIVE,
    'MIT AND GPL-3.0-only': STRONG,
    '(MIT OR GPL-2.0) AND LGPL-2.1': WEAK,
    'Apache-2.0 WITH LLVM-exception': PERMISSIVE,
    'MIT with Commons Clause': COMMERCIAL,
    'AGPL-3.0-only': NETWORK,
    'SEE LICENSE IN LICENSE.txt': REVIEW,
    'SIN-LICENCIA-DECLARADA': REVIEW,
    'LicenseRef-Unknown': REVIEW
  }
  for (const [license, category] of Object.entries(cases)) {
    assert.equal(classify(license), category, license)
  }
})

test('blocks a forbidden production license but not a dev one', async () => {
  await withRepo(async (repo) => {
    await repo.check({ updateReadme: true })

    assert.equal(await repo.check(), 1)
    assert.match(repo.output(), /BLOQUEA: inner@1\.0\.0 \[GPL-3\.0-only\]/)
    assert.doesNotMatch(repo.output(), /BLOQUEA: (jest|inner@2)/)
  })
})

test('applies exceptions and license corrections by major pattern', async () => {
  await withRepo(async (repo) => {
    repo.write('allowlist.json', { 'inner@1.*': 'aprobada' })
    repo.write('overrides.json', { 'shared@2.*': { license: 'MIT' } })
    await repo.check({ updateReadme: true })

    assert.equal(await repo.check(), 0, repo.output())
    assert.match(repo.output(), /Excepción aplicada: inner@1\.0\.0/)
    assert.match(repo.readme(), /- `shared`: MIT\n/)
    assert.match(
      repo.readme(),
      /- `inner`: GPL-3\.0-only \(copyleft-fuerte\), excepción `inner@1\.\*`/
    )
    assert.doesNotMatch(repo.readme(), /1\.0\.0|2\.0\.0/)
  })
})

test('an exception without a version cannot run', async () => {
  await withRepo(async (repo) => {
    repo.write('allowlist.json', { inner: 'sin versión' })

    await assert.rejects(repo.check(), (error) => error instanceof CheckError)
  })
})

test('a stale README blocks with the command that fixes it', async () => {
  await withRepo(async (repo) => {
    repo.write('allowlist.json', { 'inner@1.*': 'aprobada' })

    assert.equal(await repo.check(), 1)
    assert.ok(repo.output().includes(README_COMMAND))
  })
})

test('updating the README keeps its manual sections', async () => {
  await withRepo(async (repo) => {
    repo.write('allowlist.json', { 'inner@1.*': 'aprobada' })
    writeFileSync(
      join(repo.dir, 'README.md'),
      `# Manual\n\n${README_BEGIN}\nold\n${README_END}\n\nEnd\n`
    )

    await repo.check({ updateReadme: true })

    assert.ok(repo.readme().startsWith('# Manual\n'))
    assert.ok(repo.readme().endsWith('\n\nEnd\n'))
    assert.doesNotMatch(repo.readme(), /\nold\n/)
  })
})

test('a version bump that keeps the licenses keeps the README current', async () => {
  await withRepo(async (repo) => {
    repo.write('allowlist.json', { 'inner@1.*': 'aprobada' })
    await repo.check({ updateReadme: true })
    repo.writeLock({
      ...PACKAGES,
      'node_modules/app/node_modules/inner': { version: '1.2.0' }
    })

    assert.equal(await repo.check(), 0, repo.output())
  })
})

test('a dependency with a new license makes the README stale', async () => {
  await withRepo(async (repo) => {
    repo.write('allowlist.json', { 'inner@1.*': 'aprobada' })
    await repo.check({ updateReadme: true })
    repo.writeLock({ ...PACKAGES, 'node_modules/leftpad': { version: '1.0.0' } })

    assert.equal(await repo.check(), 1)
    assert.match(repo.output(), /no está al día/)
  })
})

test('lists the packages that the change adds or moves to production', async () => {
  await withRepo(async (repo) => {
    repo.write('allowlist.json', { 'inner@1.*': 'aprobada' })
    const git = (...args) =>
      execFileSync('git', ['-C', repo.root, ...args], {
        env: {
          ...process.env,
          GIT_AUTHOR_NAME: 'test',
          GIT_AUTHOR_EMAIL: 'test@example.com',
          GIT_COMMITTER_NAME: 'test',
          GIT_COMMITTER_EMAIL: 'test@example.com'
        }
      })
    git('init', '-q')
    git('add', '-A')
    git('commit', '-q', '-m', 'base')
    repo.writeLock({ ...PACKAGES, 'node_modules/jest': { version: '29.0.0' } })

    assert.equal(await repo.check({ base: 'HEAD' }), 1)
    assert.match(repo.output(), /0 nuevos, 1 pasan a producción, 0 quitados/)
    assert.match(repo.output(), /\+ jest@29\.0\.0 \[prod\] GPL-3\.0-only/)
  })
})

test('retries a dropped connection and then reports that the check cannot run', async (t) => {
  const cache = mkdtempSync(join(tmpdir(), 'license-check-cache-'))
  const previousCache = process.env.LICENSE_CHECK_CACHE
  process.env.LICENSE_CHECK_CACHE = cache
  t.after(() => {
    if (previousCache === undefined) delete process.env.LICENSE_CHECK_CACHE
    else process.env.LICENSE_CHECK_CACHE = previousCache
    rmSync(cache, { recursive: true, force: true })
  })
  const fetch = t.mock.method(global, 'fetch', async () => {
    throw new TypeError('fetch failed')
  })

  await assert.rejects(fetchJson('https://registry.example/pkg/1.0.0'), CheckError)
  assert.equal(fetch.mock.callCount(), 3)
})
