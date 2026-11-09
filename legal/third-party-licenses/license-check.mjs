#!/usr/bin/env node
// Third-party license check of pyplan-docs. Run from the repo root:
//   node legal/third-party-licenses/license-check.mjs check [--base <commit>] [--update-readme]
// Exit codes: 0 no blockers, 1 the check blocks, 2 the check could not run.
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { parseArgs } from 'node:util'

const TOOL_DIR = dirname(fileURLToPath(import.meta.url))
const NPM_REGISTRY = 'https://registry.npmjs.org'
const FETCH_ATTEMPTS = 3
const FETCH_TIMEOUT_MS = 30_000
const DEFAULT_WORKERS = 24

export const PERMISSIVE = 'permisiva'
export const WEAK = 'copyleft-debil'
export const STRONG = 'copyleft-fuerte'
export const NETWORK = 'copyleft-red'
export const COMMERCIAL = 'comercial'
export const REVIEW = 'revisar'
const RISK_ORDER = [PERMISSIVE, WEAK, STRONG, NETWORK, COMMERCIAL, REVIEW]

const DEFAULT_POLICY = { fail_on: [STRONG, NETWORK, COMMERCIAL, REVIEW] }
export const README_COMMAND =
  'node legal/third-party-licenses/license-check.mjs check --update-readme'
export const README_BEGIN = '<!-- license-check:begin -->'
export const README_END = '<!-- license-check:end -->'

// The check cannot run: invalid configuration or the npm registry is unreachable.
export class CheckError extends Error {}

const byText = (a, b) => {
  const [lowerA, lowerB] = [a.toLowerCase(), b.toLowerCase()]
  if (lowerA !== lowerB) return lowerA < lowerB ? -1 : 1
  return a < b ? -1 : a > b ? 1 : 0
}
const sortedUnique = (values) => [...new Set(values)].sort(byText)
const riskIndex = (category) => RISK_ORDER.indexOf(category)
const riskiest = (categories) =>
  categories.length === 0
    ? REVIEW
    : categories.reduce((a, b) => (riskIndex(b) > riskIndex(a) ? b : a))
const safest = (categories) => categories.reduce((a, b) => (riskIndex(b) < riskIndex(a) ? b : a))

// ------------------------------------------------------------------------------------------ http

const cacheDir = () => {
  if (process.env.LICENSE_CHECK_CACHE) return process.env.LICENSE_CHECK_CACHE
  const base = process.env.XDG_CACHE_HOME || join(homedir(), '.cache')
  return join(base, 'pyplan-license-check')
}

// Only a 200 or a 404 (null) is cached.
export const fetchJson = async (url) => {
  const path = join(cacheDir(), `${createHash('sha256').update(url).digest('hex')}.json`)
  if (existsSync(path)) return JSON.parse(readFileSync(path, 'utf8')).data
  let data
  let lastError
  for (let attempt = 0; attempt < FETCH_ATTEMPTS && data === undefined; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS)
      })
      if (response.status === 404) data = null
      else if (!response.ok) lastError = new Error(`HTTP ${response.status}`)
      else data = await response.json()
    } catch (error) {
      lastError = error
    }
  }
  if (data === undefined) throw new CheckError(`No se pudo consultar ${url}: ${lastError?.message}`)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, JSON.stringify({ url, data }))
  return data
}

// ------------------------------------------------------------------------------------- lockfile

const LOCK_PREFIX = 'node_modules/'

const parseLock = (lockText, label) => {
  let lock
  try {
    lock = JSON.parse(lockText)
  } catch (error) {
    throw new CheckError(`${label} no es JSON válido: ${error.message}`)
  }
  if (!lock?.packages || typeof lock.packages !== 'object') {
    const version = lock?.lockfileVersion ?? '?'
    throw new CheckError(
      `${label} (lockfileVersion ${version}) no tiene "packages": regenerarlo con npm 7 o posterior.`
    )
  }
  return lock.packages
}

const nameOf = (path, entry) =>
  entry.name ?? path.slice(path.lastIndexOf(LOCK_PREFIX) + LOCK_PREFIX.length)

// package-lock.json v2 or v3. Production is every installed package without "dev": true,
// optional and peer ones included.
export const loadPackageLock = (lockText, label = 'package-lock.json') => {
  const entries = parseLock(lockText, label)
  const packages = new Map()
  for (const [path, entry] of Object.entries(entries)) {
    if (!path.includes(LOCK_PREFIX) || entry.link || !entry.version) continue
    const name = nameOf(path, entry)
    const key = `${name}@${entry.version}`
    const scope = entry.dev ? 'dev' : 'prod'
    const known = packages.get(key)
    if (!known) packages.set(key, { key, name, version: entry.version, scope })
    else if (scope === 'prod') known.scope = 'prod'
  }
  return packages
}

// ------------------------------------------------------------------------------------- licenses

const npmLicenseValue = (doc) => {
  let value = doc.license
  if (value && typeof value === 'object') value = value.type ?? ''
  if (!value && Array.isArray(doc.licenses)) {
    value = doc.licenses
      .map((item) => (item && typeof item === 'object' ? item.type ?? '' : String(item)))
      .filter(Boolean)
      .join(' OR ')
  }
  return String(value ?? '')
}

const lookupNpm = async (pkg, fetcher) => {
  const name = encodeURIComponent(pkg.name).replace(/^%40/, '@')
  const doc = await fetcher(`${NPM_REGISTRY}/${name}/${encodeURIComponent(pkg.version)}`)
  return doc === null ? 'NO-ENCONTRADO' : npmLicenseValue(doc)
}

const TEXT_HINTS = [
  [/GNU AFFERO GENERAL PUBLIC/, 'AGPL'],
  [/GNU LESSER GENERAL PUBLIC|GNU LIBRARY GENERAL PUBLIC/, 'LGPL'],
  [/GNU GENERAL PUBLIC/, 'GPL'],
  [/Mozilla Public License/, 'MPL-2.0'],
  [/Apache License/, 'Apache-2.0'],
  [/Permission is hereby granted, free of charge/, 'MIT'],
  [/Redistribution and use in source and binary forms/, 'BSD'],
  [/\bMIT\b/i, 'MIT'],
  [/\bBSD\b/i, 'BSD'],
  [/\bApache\b/i, 'Apache-2.0'],
  [/\bPSF\b|Python Software Foundation/i, 'PSF-2.0']
]

const licenseFromText = (text) => TEXT_HINTS.find(([pattern]) => pattern.test(text))?.[1] ?? ''

const ALIASES = {
  'apache 2.0': 'Apache-2.0',
  'apache-2': 'Apache-2.0',
  'apache 2': 'Apache-2.0',
  apache2: 'Apache-2.0',
  'apache license 2.0': 'Apache-2.0',
  'apache license, version 2.0': 'Apache-2.0',
  'apache license version 2.0': 'Apache-2.0',
  'apache software license': 'Apache-2.0',
  'apache software license 2.0': 'Apache-2.0',
  apache: 'Apache-2.0',
  'asl 2': 'Apache-2.0',
  'mit license': 'MIT',
  'the mit license': 'MIT',
  'mit/x11': 'MIT',
  expat: 'MIT',
  'expat license': 'MIT',
  'bsd license': 'BSD',
  'new bsd': 'BSD-3-Clause',
  'new bsd license': 'BSD-3-Clause',
  'modified bsd': 'BSD-3-Clause',
  'bsd-3': 'BSD-3-Clause',
  '3-clause bsd': 'BSD-3-Clause',
  '3-clause bsd license': 'BSD-3-Clause',
  'bsd 3-clause': 'BSD-3-Clause',
  'bsd-2': 'BSD-2-Clause',
  'simplified bsd': 'BSD-2-Clause',
  'the bsd 2-clause license': 'BSD-2-Clause',
  psf: 'PSF-2.0',
  'psf license': 'PSF-2.0',
  'mpl 2.0': 'MPL-2.0',
  'mpl-2.0 license': 'MPL-2.0',
  lgpl: 'LGPL',
  lgplv3: 'LGPL-3.0',
  'gnu lgpl': 'LGPL',
  'public domain': 'Public-Domain',
  'dual license': 'REVISAR',
  'isc license': 'ISC',
  'isc license (iscl)': 'ISC'
}

const PERMISSIVE_IDS =
  /^(MIT|MIT-0|MIT-CMU|X11|ISC|0BSD|BSD(-[234]-Clause.*)?|BSD-3-Clause-Clear|Apache-2\.0|Apache-1\.1|Unlicense|CC0-1\.0|CC-BY-[34]\.0|WTFPL|Zlib|zlib-acknowledgement|PSF-2\.0|Python-2\.0(\.1)?|BlueOak-1\.0\.0|BSL-1\.0|HPND.*|NCSA|UPL-1\.0|W3C.*|PostgreSQL|curl|OpenSSL|Unicode-.*|ZPL-2\.1|OFL-1\.1|Public-Domain|Repoze|AFL-[0-9.]+|Artistic-2\.0|Python-2\.0-complete|SMLNJ|CNRI-Python|PIL|MIT-Modern-Variant|Beerware|CC-BY-SA-4\.0-content|ZPL|BSD-Source-Code)$/i
const WEAK_IDS =
  /^(LGPL.*|MPL-.*|EPL-.*|CDDL-.*|CPL-.*|EUPL-.*|MS-RL|CC-BY-SA-.*|Artistic|Artistic-1\.0.*)$/i
const STRONG_IDS = /^(GPL.*)$/i
const NETWORK_IDS = /^(AGPL.*|SSPL.*|OSL-3\.0|RPL-.*|CPAL-.*|(LicenseRef-)?RSAL.*)$/i
const COMMERCIAL_HINT =
  /comercial|commercial|proprietary|font ?awesome-?pro|handsontable|eula|terms-of-service|commons[ -]?clause/i
const REVIEW_IDS = new Set([
  'SIN-LICENCIA-DECLARADA',
  'NO-ENCONTRADO',
  'TEXTO-NO-ESTANDAR',
  'REVISAR'
])
const CATEGORY_PATTERNS = [
  [NETWORK_IDS, NETWORK],
  [STRONG_IDS, STRONG],
  [WEAK_IDS, WEAK],
  [PERMISSIVE_IDS, PERMISSIVE]
]

export const normalize = (raw) => {
  const text = (raw ?? '').trim()
  if (!text) return 'SIN-LICENCIA-DECLARADA'
  return ALIASES[text.toLowerCase()] ?? text.replace(/\s+/g, ' ')
}

const tokenize = (expression) => {
  const merged = []
  for (const token of expression.replaceAll('/', ' OR ').match(/\(|\)|[^\s()]+/g) ?? []) {
    const upper = token.toUpperCase()
    if (['AND', 'OR', '(', ')'].includes(upper)) merged.push(upper)
    else if (merged.length > 0 && !['AND', 'OR', '('].includes(merged.at(-1))) {
      merged[merged.length - 1] += ` ${token}`
    } else merged.push(token)
  }
  return merged
}

const categoryOfId = (id, allowHint = true) => {
  if (COMMERCIAL_HINT.test(id)) return COMMERCIAL
  let spdx = id.split(/\s+WITH\s+/i)[0].trim()
  spdx = ALIASES[spdx.toLowerCase()] ?? spdx
  const match = CATEGORY_PATTERNS.find(([pattern]) => pattern.test(spdx))
  if (match) return match[1]
  if (spdx.toLowerCase().startsWith('licenseref-')) return REVIEW
  const hint = allowHint && spdx.length <= 60 ? licenseFromText(spdx) : ''
  return hint ? categoryOfId(hint, false) : REVIEW
}

// OR takes the least restrictive option and AND the most restrictive term.
const evalExpression = (tokens, start = 0) => {
  const options = []
  let terms = []
  let pos = start
  while (pos < tokens.length) {
    const token = tokens[pos++]
    if (token === '(') {
      const [category, next] = evalExpression(tokens, pos)
      terms.push(category)
      pos = next
    } else if (token === ')') break
    else if (token === 'OR') {
      options.push(riskiest(terms))
      terms = []
    } else if (token !== 'AND') terms.push(categoryOfId(token))
  }
  options.push(riskiest(terms))
  return [safest(options), pos]
}

export const classify = (license) => {
  if (REVIEW_IDS.has(license)) return REVIEW
  if (/SEE LICENSE IN|UNLICENSED|Custom|Other\/Proprietary/i.test(license)) {
    return COMMERCIAL_HINT.test(license) ? COMMERCIAL : REVIEW
  }
  return evalExpression(tokenize(license))[0]
}

// ---------------------------------------------------------------------------------------- config

const readJson = (path, fallback) => {
  if (!existsSync(path)) {
    if (fallback !== undefined) return fallback
    throw new CheckError(`Falta ${path}`)
  }
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch (error) {
    throw new CheckError(`${path} no es JSON válido: ${error.message}`)
  }
}

// Keys are `package@version` or `package@glob`; keys starting with _ are comments.
export const versionedEntries = (path) => {
  const entries = Object.fromEntries(
    Object.entries(readJson(path, {})).filter(([key]) => !key.startsWith('_'))
  )
  const unversioned = Object.keys(entries)
    .filter((key) => !key.replace(/^@/, '').includes('@'))
    .sort()
  if (unversioned.length > 0) {
    throw new CheckError(`Entradas sin versión en ${path}: ${unversioned.join(', ')}`)
  }
  return entries
}

const globToRegExp = (glob) =>
  new RegExp(
    `^${glob
      .split('')
      .map((char) =>
        char === '*' ? '.*' : char === '?' ? '.' : char.replace(/[.+^${}()|[\]\\]/g, '\\$&')
      )
      .join('')}$`
  )

export const matchPattern = (key, patterns) => {
  if (key in patterns) return key
  return Object.keys(patterns).find((pattern) => globToRegExp(pattern).test(key)) ?? ''
}

export const loadConfig = (path) => {
  const file = resolve(path)
  const raw = readJson(file)
  for (const key of ['project', 'lock']) {
    if (!raw[key]) throw new CheckError(`${file}: falta '${key}'`)
  }
  const policy = { ...DEFAULT_POLICY, ...raw.policy }
  const unknown = policy.fail_on.filter((category) => !RISK_ORDER.includes(category))
  if (unknown.length > 0) throw new CheckError(`${file}: categorías desconocidas ${unknown}`)
  const directory = dirname(file)
  return { ...raw, policy, directory, root: resolve(directory, '..', '..') }
}

const applyOverrides = (packages, overrides) => {
  for (const pkg of packages) {
    const pattern = matchPattern(pkg.key, overrides)
    if (!pattern) continue
    const entry = overrides[pattern]
    if (entry.category && !RISK_ORDER.includes(entry.category)) {
      throw new CheckError(`overrides.json: categoría inválida en ${pattern}`)
    }
    if (entry.license) pkg.license = entry.license
    if (entry.license || entry.category) pkg.override = pattern
    pkg.category = entry.category ?? classify(pkg.license)
    pkg.note = entry.note ?? ''
  }
}

// ------------------------------------------------------------------------------------------- git

const gitReader = (root, ref) => {
  const git = (...args) =>
    execFileSync('git', ['-c', 'safe.directory=*', '-C', root, ...args], {
      encoding: 'utf8',
      maxBuffer: 256 * 1024 * 1024,
      stdio: ['ignore', 'pipe', 'ignore']
    })
  try {
    git('rev-parse', '--verify', '--quiet', `${ref}^{commit}`)
  } catch {
    return null
  }
  return (file) => {
    try {
      return git('show', `${ref}:${file}`)
    } catch {
      return null
    }
  }
}

const worktreeReader = (root) => (file) => {
  const path = join(root, file)
  return existsSync(path) ? readFileSync(path, 'utf8') : null
}

const loadPackages = (config, read) => {
  const lock = read(config.lock)
  if (lock === null) return null
  return loadPackageLock(lock, config.lock)
}

// ----------------------------------------------------------------------------------------- check

const resolveLicenses = async (packages, fetcher, workers) => {
  const queue = [...packages]
  const worker = async () => {
    while (queue.length > 0) {
      const pkg = queue.pop()
      pkg.licenseRaw = await lookupNpm(pkg, fetcher)
      pkg.license = normalize(pkg.licenseRaw)
      pkg.category = classify(pkg.license)
    }
  }
  await Promise.all(Array.from({ length: Math.min(workers, queue.length) }, worker))
}

const shortRef = (ref) => (/^[0-9a-f]{40}$/.test(ref) ? ref.slice(0, 12) : ref)

const diffAgainstBase = (config, packages, base) => {
  const read = gitReader(config.root, base)
  if (!read) return [`AVISO: no se pudo leer ${base}; no se listan los cambios.`]
  const before = loadPackages(config, read) ?? new Map()
  const added = [...packages.values()].filter(
    (pkg) => !before.has(pkg.key) || (pkg.scope === 'prod' && before.get(pkg.key).scope === 'dev')
  )
  const newCount = added.filter((pkg) => !before.has(pkg.key)).length
  const removed = [...before.keys()].filter((key) => !packages.has(key)).length
  const lines = [
    `${config.lock}: ${newCount} nuevos, ${added.length - newCount} pasan a producción, ` +
      `${removed} quitados respecto de ${shortRef(base)}`
  ]
  added
    .sort((a, b) => (a.scope === b.scope ? byText(a.name, b.name) : a.scope === 'prod' ? -1 : 1))
    .forEach((pkg) => {
      const note = pkg.note ? ` (${pkg.note})` : ''
      lines.push(`  + ${pkg.key} [${pkg.scope}] ${pkg.license} -> ${pkg.category}${note}`)
    })
  return lines
}

const markdownCell = (text) => text.replaceAll('|', '\\|')

const overrideLabel = ({ license, category }) => {
  if (!license) return `categoría ${category}`
  return category ? `${license} (${category})` : license
}

// Without versions: a version bump that changes no license leaves the block as it is.
export const readmeBlock = (packages, overrides) => {
  const licenses = new Map()
  for (const pkg of packages) {
    if (!licenses.has(pkg.category)) licenses.set(pkg.category, { prod: [], dev: [] })
    licenses.get(pkg.category)[pkg.scope].push(pkg.license)
  }
  const lines = [
    README_BEGIN,
    `_Generado con \`${README_COMMAND}\`: no se edita a mano. \`check\` falla si no coincide con las dependencias._`,
    '',
    '| Familia | Producción | Solo desarrollo |',
    '|---|---|---|'
  ]
  for (const category of RISK_ORDER.filter((name) => licenses.has(name))) {
    const [prod, dev] = ['prod', 'dev'].map(
      (scope) => markdownCell(sortedUnique(licenses.get(category)[scope]).join(', ')) || '—'
    )
    lines.push(`| ${category} | ${prod} | ${dev} |`)
  }

  const risky = sortedUnique(
    packages
      .filter((pkg) => pkg.scope === 'prod' && pkg.category !== PERMISSIVE)
      .map((pkg) => {
        const exception = pkg.allowedBy ? `, excepción \`${pkg.allowedBy}\`` : ''
        return `- \`${pkg.name}\`: ${pkg.license} (${pkg.category})${exception}`
      })
  )
  lines.push('', 'Dependencias de producción no permisivas:', '')
  lines.push(...(risky.length > 0 ? risky : ['- Ninguna.']))

  const corrected = sortedUnique(
    packages
      .filter((pkg) => pkg.override)
      .map((pkg) => `- \`${pkg.name}\`: ${overrideLabel(overrides[pkg.override])}`)
  )
  lines.push('', 'Licencias corregidas en `overrides.json`:', '')
  lines.push(...(corrected.length > 0 ? corrected : ['- Ninguna.']), README_END)
  return lines.join('\n')
}

export const readmeCurrentBlock = (path) => {
  if (!existsSync(path)) return null
  const text = readFileSync(path, 'utf8').replaceAll('\r\n', '\n')
  const start = text.indexOf(README_BEGIN)
  const end = text.indexOf(README_END, start)
  if (start === -1 || end === -1) return null
  return text.slice(start, end + README_END.length)
}

export const updateReadme = (path, block) => {
  const text = existsSync(path) ? readFileSync(path, 'utf8') : ''
  const start = text.indexOf(README_BEGIN)
  const end = text.indexOf(README_END, start)
  const updated =
    start !== -1 && end !== -1
      ? text.slice(0, start) + block + text.slice(end + README_END.length)
      : `${text.replace(/\n+$/, '')}\n\n${block}\n`
  writeFileSync(path, updated)
}

const summary = (packages, scope) => {
  const inScope = packages.filter((pkg) => pkg.scope === scope)
  const counts = RISK_ORDER.map((category) => [
    category,
    inScope.filter((pkg) => pkg.category === category).length
  ]).filter(([, count]) => count > 0)
  return `[${scope}] ${inScope.length}: ${counts
    .map(([name, count]) => `${name} ${count}`)
    .join(' · ')}`
}

export const runCheck = async ({
  configPath = join(TOOL_DIR, 'config.json'),
  base = '',
  updateReadme: rewriteReadme = false,
  workers = DEFAULT_WORKERS,
  fetcher = fetchJson,
  log = console.log
} = {}) => {
  const config = loadConfig(configPath)
  const overrides = versionedEntries(join(config.directory, 'overrides.json'))
  const allow = versionedEntries(join(config.directory, 'allowlist.json'))
  log(`license-check · ${config.project}`)

  const byKey = loadPackages(config, worktreeReader(config.root))
  if (!byKey) throw new CheckError(`No existe ${config.lock}`)
  const packages = [...byKey.values()]
  log(`Consultando la licencia de ${packages.length} paquetes...`)
  await resolveLicenses(packages, fetcher, workers)
  applyOverrides(packages, overrides)

  const used = new Set()
  const violations = []
  for (const pkg of packages) {
    if (pkg.scope !== 'prod' || !config.policy.fail_on.includes(pkg.category)) continue
    pkg.allowedBy = matchPattern(pkg.key, allow)
    if (pkg.allowedBy) used.add(pkg.allowedBy)
    else violations.push(pkg)
  }

  log(`${config.lock} ${summary(packages, 'prod')}`)
  log(`${config.lock} ${summary(packages, 'dev')}`)
  if (base) {
    log('')
    diffAgainstBase(config, byKey, base).forEach((line) => log(line))
  }

  const weak = sortedUnique(
    packages.filter((pkg) => pkg.scope === 'prod' && pkg.category === WEAK).map((pkg) => pkg.key)
  )
  if (weak.length > 0) log(`\nCopyleft débil en producción (se informa): ${weak.join(', ')}`)
  for (const pkg of [...packages]
    .filter((item) => item.allowedBy)
    .sort((a, b) => byText(a.key, b.key))) {
    log(`Excepción aplicada: ${pkg.key} (${pkg.allowedBy}: ${allow[pkg.allowedBy]})`)
  }

  for (const pattern of Object.keys(allow)
    .filter((key) => !used.has(key))
    .sort()) {
    log(`AVISO: la excepción ${pattern} de allowlist.json ya no se usa: quitarla.`)
  }

  log('')
  const block = readmeBlock(packages, overrides)
  const readmePath = join(config.directory, 'README.md')
  const readme = relative(config.root, readmePath)
  let staleReadme = false
  if (rewriteReadme) {
    updateReadme(readmePath, block)
    log(`README actualizado: ${readme}`)
  } else if (readmeCurrentBlock(readmePath) !== block) {
    staleReadme = true
    log(
      `BLOQUEA: el estado de ${readme} no está al día. Correr \`${README_COMMAND}\` y commitear el README.`
    )
  }

  const blocked = sortedUnique(
    violations.map(
      (pkg) =>
        `BLOQUEA: ${pkg.key} [${pkg.license}] -> ${pkg.category}. Reemplazarla, o aprobar una excepción con versión en allowlist.json.`
    )
  )
  blocked.forEach((line) => log(line))
  const count = blocked.length + (staleReadme ? 1 : 0)
  log(`Resultado: ${count > 0 ? `BLOQUEADO (${count})` : 'OK'}`)
  return count > 0 ? 1 : 0
}

// ------------------------------------------------------------------------------------------- cli

const USAGE = `Uso: node legal/third-party-licenses/license-check.mjs check [opciones]

  --base <commit>     lista lo que el cambio agrega respecto de ese commit
  --update-readme     reescribe el bloque "Estado actual" del README.md del directorio
  --workers <n>       consultas en paralelo al registro de npm (por defecto, ${DEFAULT_WORKERS})
  --config <ruta>     config.json (por defecto, el que está al lado de la herramienta)`

export const main = async (argv) => {
  let parsed
  try {
    parsed = parseArgs({
      args: argv,
      allowPositionals: true,
      options: {
        base: { type: 'string' },
        'update-readme': { type: 'boolean', default: false },
        workers: { type: 'string', default: String(DEFAULT_WORKERS) },
        config: { type: 'string' },
        help: { type: 'boolean', default: false }
      }
    })
  } catch (error) {
    console.error(`${error.message}\n\n${USAGE}`)
    return 2
  }
  const { positionals, values } = parsed
  if (values.help || positionals.length !== 1 || positionals[0] !== 'check') {
    console.error(USAGE)
    return values.help ? 0 : 2
  }
  const workers = Number.parseInt(values.workers, 10)
  if (!(workers > 0)) {
    console.error(`--workers debe ser un entero positivo\n\n${USAGE}`)
    return 2
  }
  try {
    return await runCheck({
      configPath: values.config,
      base: values.base,
      updateReadme: values['update-readme'],
      workers
    })
  } catch (error) {
    console.error(error instanceof CheckError ? `ERROR: ${error.message}` : error)
    return 2
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = await main(process.argv.slice(2))
}
