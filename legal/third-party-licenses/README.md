# Licencias de terceros — pyplan-docs

Estado de las licencias de las dependencias npm del sitio de documentación, y el control que lo mantiene al día. Este directorio está fuera de `docs/`, así que no se publica en docs.pyplan.com.

## Qué hay en este directorio

| Archivo | Qué es |
|---|---|
| `license-check.mjs` | La herramienta del control, en Node (sin dependencias). Sus tests están en `tests/`. |
| `config.json` | Qué revisa (`package-lock.json`) y qué categorías bloquean. |
| `allowlist.json` | Excepciones aprobadas, con versión o patrón por major y su motivo. |
| `overrides.json` | Licencias mal declaradas en npm, corregidas por versión exacta, y notas de revisión. |

## Cómo se usa

Desde la raíz del repo, con la versión de Node de `.node-version`:

```bash
node legal/third-party-licenses/license-check.mjs check                     # control
node legal/third-party-licenses/license-check.mjs check --base origin/main  # y lo que agrega la rama
node legal/third-party-licenses/license-check.mjs check --update-readme     # actualiza "Estado actual"
node --test legal/third-party-licenses/tests/*.test.mjs                     # tests de la herramienta
```

No hace falta `npm install`: la herramienta lee `package-lock.json` y consulta en el registro de npm la licencia de la versión exacta de cada paquete (cerca de un minuto la primera vez). Las respuestas quedan en `~/.cache/pyplan-license-check` (o en `LICENSE_CHECK_CACHE`) y las siguientes corridas tardan un segundo. Sale con 0 si no hay bloqueos, con 1 si el control bloquea y con 2 si no pudo correr (configuración inválida o npm inaccesible tras los reintentos).

Producción es todo paquete de `package-lock.json` sin `"dev": true`, incluidos los opcionales y los peer: las dependencias de Docusaurus en `dependencies` lo son casi todas. Un paquete opcional o peer que se instala pero no llega al sitio se documenta, si su licencia bloquea, como excepción en `allowlist.json`.

**No corre en el pipeline**: lo corre quien desarrolla, cada vez que agrega, actualiza o quita una dependencia, o cambia este directorio. Con Claude Code lo hace la skill `license-check` (`.claude/skills/license-check/`). Si cambia la herramienta, correr también sus tests. Bloquea (código 1) si:

- una dependencia de producción tiene licencia de copyleft fuerte, de red, comercial o sin declarar y no está en `allowlist.json`;
- la sección **Estado actual** no coincide con las dependencias. Se arregla corriendo `check --update-readme` y commiteando este README.

Si bloquea por una licencia: reemplazar la dependencia; o, si npm declara mal la licencia, corregirla en `overrides.json` con la versión exacta; o, si la licencia es aceptable, agregar la excepción a `allowlist.json` con su motivo, para que se apruebe en el PR.

**Estado actual** no lleva versiones: una subida de versión que no cambia ninguna licencia no lo desactualiza.

## Estado actual

<!-- license-check:begin -->
_Generado con `node legal/third-party-licenses/license-check.mjs check --update-readme`: no se edita a mano. `check` falla si no coincide con las dependencias._

| Familia | Producción | Solo desarrollo |
|---|---|---|
| permisiva | (BSD-2-Clause OR MIT OR Apache-2.0), (MIT OR CC0-1.0), (WTFPL OR MIT), 0BSD, Apache-2.0, BlueOak-1.0.0, BSD-2-Clause, BSD-3-Clause, CC-BY-4.0, CC0-1.0, ISC, MIT, MIT-0, Python-2.0 | MIT |

Dependencias de producción no permisivas:

- Ninguna.

Licencias corregidas en `overrides.json`:

- `require-like`: MIT
<!-- license-check:end -->
