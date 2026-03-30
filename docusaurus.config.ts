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

  // GitHub Pages deployment config
  url: 'https://pyplan.github.io',
  baseUrl: '/pyplan-docs/',
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
    //   items: [
    //     {
    //       type: 'docSidebar',
    //       sidebarId: 'docsSidebar',
    //       position: 'left',
    //       label: 'Documentation',
    //     },
    //     {
    //       href: 'https://github.com/pyplan/pyplan-docs',
    //       label: 'GitHub',
    //       position: 'right',
    //     },
    //   ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'User Guide',
              to: '/user-guide/access-to-pyplan',
            },
            {
              label: 'Tutorials',
              to: '/tutorials/getting-started-with-pyplan',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Pyplan Website',
              href: 'https://pyplan.com',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/pyplan/pyplan-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Pyplan`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
