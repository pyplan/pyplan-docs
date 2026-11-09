---
id: third-party-software
title: Third-Party Software
sidebar_label: Third-Party Software
sidebar_position: 3
description: Open source components in Pyplan, where their license notices are, the written offer for source code, and third-party images in self-hosted installations.
---

# Third-Party Software

**Effective date:** November 9, 2026
**Last updated:** November 9, 2026

Pyplan includes open source and other third-party components. Each component is governed by its own license, which prevails over any other terms for that component. This page explains where the license notices are, how to request the source code of components under copyleft licenses, and which third-party images a self-hosted (on-premise) installation uses.

---

## 1. Notices inside the Pyplan images

Every Pyplan container image carries its own notice, generated when the image is built. It lists the exact components and versions in that image, with their licenses, and it prevails over this page.

The notice is always at the same path:

```text
/usr/share/doc/pyplan/THIRD-PARTY-NOTICES.txt
```

| Image | What the notice covers |
|---|---|
| `pyplan/pyplan_api` | Python packages, the Python interpreter and the operating system packages, with their license texts. |
| `pyplan/pyplan_engine` | Python packages, the Python interpreter, the operating system packages, the Java runtime and the Microsoft ODBC driver. The package lists it refers to are in the same folder. |
| `pyplan/pyplan_ui` | The operating system packages and nginx. The package list it refers to is in the same folder. |
| `pyplan/pyplan_ai` | Python packages, the Python interpreter and the operating system packages, with their license texts. |

To copy the notice out of an installed image without running it:

```bash
id=$(docker create <image>:<tag>) \
  && docker cp "$id":/usr/share/doc/pyplan/THIRD-PARTY-NOTICES.txt . \
  && docker rm "$id"
```

The components that the web application and the Excel add-in send to your browser are listed in the application, under **About → Open source licenses**, and in the add-in, under the **Licenses** link at the bottom of its panel.

---

## 2. Written offer for source code

For at least three (3) years after Pyplan Inc. last distributes a given version of a Pyplan container image, Pyplan Inc. will give any third party who requests it a complete machine-readable copy of the corresponding source code of the components of that version that are licensed under the GNU General Public License, the GNU Lesser General Public License, the GNU Affero General Public License, the Eclipse Public License or the Mozilla Public License, for a charge no greater than Pyplan Inc.'s cost of physically performing the distribution.

This offer is valid to anyone in receipt of this information.

To request the source code, write to [info@pyplan.com](mailto:info@pyplan.com) and state the image name, its tag or digest, and, if you need only part of it, the components you want.

---

## 3. Third-party images in self-hosted installations

A self-hosted installation also runs images that Pyplan does not build:

| Image | Publisher | License |
|---|---|---|
| `redis` | Redis Ltd. | Redis 8.0 and later: your choice of the GNU Affero General Public License v3 (AGPLv3), the Redis Source Available License v2 (RSALv2) or the Server Side Public License v1 (SSPLv1). Redis 7.2 and earlier: BSD-3-Clause. |
| `postgres` | PostgreSQL Global Development Group | PostgreSQL License |
| `nginx`, `nginxinc/nginx-unprivileged` | F5, Inc. | BSD-2-Clause |

Each of these images also contains operating system packages under their own licenses. Their publishers provide the notices and the source code.

**When you install Pyplan with its Docker Compose files**, your installation downloads these images directly from their publishers, and you receive them under their publishers' licenses. Pyplan does not distribute them to you.

**When Pyplan copies these images to a registry you own, or delivers them to you as files**, Pyplan distributes them unmodified, and the written offer in [section 2](#2-written-offer-for-source-code) also covers their components.

:::info Redis license election
Pyplan uses Redis unmodified and, for Redis 8.0 and later, under the AGPLv3. Running an unmodified Redis under the AGPLv3 imposes no source code obligations on the person running it. If you modify Redis or offer it as a service to third parties, review the license you elect before doing so.
:::

---

## 4. Contact

**Pyplan Inc.**
2035 Sunset Lake Road, Suite B-2
Newark, Delaware 19702
United States of America

- Source code requests and license questions: [info@pyplan.com](mailto:info@pyplan.com)
- Website: [https://pyplan.com](https://pyplan.com)

---

*See also our [Terms of Service](./terms-of-service) and [Privacy Policy](./privacy-policy).*
