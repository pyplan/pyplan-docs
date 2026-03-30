import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Pyplan Documentation',
  tagline: 'Planning and Analytics Platform',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  // GitHub Pages deployment config (custom domain)
  url: 'https://docs.pyplan.com',
  baseUrl: '/',
  organizationName: 'pyplan',
  projectName: 'pyplan-docs',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/pyplan/pyplan-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/pyplan-social-card.png',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Pyplan',
      logo: {
        alt: 'Pyplan Logo',
        src: 'img/favicon.png',
      },
      items: [
        {
          href: 'https://github.com/pyplan/pyplan-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Pyplan`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'bash'],
    },
    algolia: {
      // The application ID provided by Algolia
      appId: 'JR54EAOPVR',

      // Public API key: it is safe to commit it
      apiKey: 'b259f2e1a4e97caf393a10672d5fc2dc',

      indexName: 'Pyplan Documentation',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      replaceSearchResultPathname: {
        from: '/docs/', // or as RegExp: /\/docs\//
        to: '/',
      },

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
      insights: false,

      // // Optional: whether you want to use the new Ask AI feature (undefined by default)
      // askAi: 'YOUR_ALGOLIA_ASK_AI_ASSISTANT_ID',

      //... other Algolia params
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
