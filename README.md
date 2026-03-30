# Pyplan Documentation

This repository contains the official documentation for [Pyplan](https://pyplan.com), built with [Docusaurus 3](https://docusaurus.io/).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 20.0

### Installation

```bash
npm install
```

### Local Development

```bash
npm start
```

This starts a local development server at `http://localhost:3000` and opens a browser window. Most changes are reflected live without restarting the server.

### Build

```bash
npm run build
```

Generates static content into the `build` directory that can be served by any static hosting service.

### Type Check

```bash
npm run typecheck
```

## Deployment

This site is automatically deployed to GitHub Pages when changes are merged to the `main` branch via GitHub Actions.

## Project Structure

```
pyplan-docs/
├── docs/                  # Documentation content (Markdown)
│   ├── intro.md           # Landing page
│   ├── user-guide/        # User guide section
│   └── tutorials/         # Tutorials section
├── src/
│   └── css/custom.css     # Custom styling
├── static/                # Static assets (images, favicon)
├── docusaurus.config.ts   # Docusaurus configuration
├── sidebars.ts            # Sidebar configuration
└── package.json
```
