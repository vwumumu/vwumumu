// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Mumu Wu',
  tagline: 'Beyond yourself',
  url: 'https://vwumumu.github.io',
  baseUrl: '/vwumumu/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'vwumumu', // Usually your GitHub org/user name.
  projectName: 'vwumumu', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/main/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'My Site',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'chzhshch/chzhshchintro',
            position: 'left',
            label: '缠论',
          },
          {
            type: 'doc',
            docId: 'book/bookintro',
            position: 'left',
            label: '读书',
          },
          {
            type: 'doc',
            docId: 'coding/codingintro',
            position: 'left',
            label: '编程',
          },
          {
            type: 'doc',
            docId: 'cookbook/cookbookintro',
            position: 'left',
            label: '菜谱',
          },
          {
            type: 'doc',
            docId: 'other/otherintro',
            position: 'left',
            label: '其他',
          },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {
                label: '缠论',
                to: '/docs/chzhshch/chzhshchintro',
              },
              {
                label: '读书',
                to: '/docs/book/bookintro',
              },
              {
                label: '编程',
                to: '/docs/coding/codingintro',
              },
              {
                label: '其他',
                to: '/docs/other/otherintro',
              },
            ],
          },
          {
            title: '社区',
            /*items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],*/
          },
          {
            title: '更多',
            /*items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],*/
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Mumu Wu.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
