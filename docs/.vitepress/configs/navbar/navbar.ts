import type {NavbarConfig} from '@vuepress/theme-default'
import {version} from '../meta.js'

export const navbarZh: NavbarConfig = [
	{
		text: '编程语言',
		children: [
			{
				text: 'PHP',
				link: '/language/PHP',
			},
		],
	},
	{
		text: 'Linux',
		children: [
			{
				text: '命令',
				children: ['/Linux/commands/'],
			},
			{
				text: 'shell脚本',
				children: ['/Linux/shell/'],
			},
		],
	},
	{
		text: '计算机',
		link: '/computer/',
	},
	{
		text: '数据库',
		link: '/database/',
	},
	{
		text: '工具',
		children: [
			{
				text: 'npm',
				children: ['/tools/npm/npm-registry.md'],
			},
			{
				text: '工具',
				children: ['/tools/README.md'],
			},
			{
				text: 'Git',
				children: [
					'/tools/git/README.md',
					'/tools/git/git-basic-command.md',
					'/tools/git/push-to-multi-repo.md',
					'/tools/git/git-error.md',
					'/tools/git/git-proxy.md',
					'/tools/git/git-setting.md',
					'/tools/git/Command-line-instructions.md',
				],
			},
			{
				text: 'FTP',
				children: ['/tools/FTP/setting.md'],
			},
			{
				text: 'Brew',
				children: ['/tools/Brew/change-brew-source.md'],
			},
			{
				text: 'VSCode',
				children: ['/tools/VSCode/keys.md', '/tools/VSCode/plugin.md'],
			},
			{
				text: 'PHPstorm',
				children: [
					'/tools/phpstorm/README.md',
					'/tools/phpstorm/keys.md',
					'/tools/phpstorm/laravel-code-tip.md',
					'/tools/phpstorm/setting-skills.md',
					'/tools/phpstorm/laravel-print-sql.md',
					'/tools/phpstorm/laravel-model-tool-and-debugbar.md',
				],
			},
			{
				text: 'Laradock',
				children: [
					'/tools/Laradock/README.md',
					'/tools/Laradock/php-inner-request-error.md',
				],
			},
			{
				text: 'Docker',
				children: [
					'/tools/Docker/README.md',
					'/tools/Docker/docker-install.md',
				],
			},
		],
	},
	{
		text: '指南',
		children: [
			'/guide/introduction.md',
			'/guide/getting-started.md',
			'/guide/configuration.md',
			'/guide/page.md',
			'/guide/markdown.md',
			'/guide/assets.md',
			'/guide/i18n.md',
			'/guide/deployment.md',
			'/guide/theme.md',
			'/guide/plugin.md',
			'/guide/bundler.md',
			'/guide/migration.md',
			'/guide/troubleshooting.md',
		],
	},
	{
		text: '参考',
		children: [
			{
				text: 'VuePress',
				children: [
					'/reference/cli.md',
					'/reference/config.md',
					'/reference/frontmatter.md',
					'/reference/components.md',
					'/reference/plugin-api.md',
					'/reference/theme-api.md',
					'/reference/client-api.md',
					'/reference/node-api.md',
				],
			},
			{
				text: '打包工具',
				children: [
					'/reference/bundler/vite.md',
					'/reference/bundler/webpack.md',
				],
			},
			{
				text: '默认主题',
				children: [
					'/reference/default-theme/config.md',
					'/reference/default-theme/frontmatter.md',
					'/reference/default-theme/components.md',
					'/reference/default-theme/markdown.md',
					'/reference/default-theme/styles.md',
					'/reference/default-theme/extending.md',
				],
			},
		],
	},
	{
		text: '插件',
		children: [
			{
				text: '常用功能',
				children: [
					'/reference/plugin/back-to-top.md',
					'/reference/plugin/container.md',
					'/reference/plugin/external-link-icon.md',
					'/reference/plugin/google-analytics.md',
					'/reference/plugin/medium-zoom.md',
					'/reference/plugin/nprogress.md',
					'/reference/plugin/register-components.md',
				],
			},
			{
				text: '内容搜索',
				children: [
					'/reference/plugin/docsearch.md',
					'/reference/plugin/search.md',
				],
			},
			{
				text: 'PWA',
				children: [
					'/reference/plugin/pwa.md',
					'/reference/plugin/pwa-popup.md',
				],
			},
			{
				text: '语法高亮',
				children: [
					'/reference/plugin/prismjs.md',
					'/reference/plugin/shiki.md',
				],
			},
			{
				text: '主题开发',
				children: [
					'/reference/plugin/active-header-links.md',
					'/reference/plugin/git.md',
					'/reference/plugin/palette.md',
					'/reference/plugin/theme-data.md',
					'/reference/plugin/toc.md',
				],
			},
		],
	},
	{
		text: '了解更多',
		children: [
			{
				text: '深入',
				children: [
					'/advanced/architecture.md',
					'/advanced/plugin.md',
					'/advanced/theme.md',
					{
						text: 'Cookbook',
						link: '/advanced/cookbook/',
					},
				],
			},
			{
				text: '其他资源',
				children: [
					{
						text: '贡献指南',
						link: 'https://github.com/vuepress/core/blob/main/CONTRIBUTING_zh.md',
					},
					{
						text: 'Awesome VuePress',
						link: 'https://github.com/vuepress/awesome-vuepress',
					},
				],
			},
		],
	},
	{
		text: `v${version}`,
		children: [
			{
				text: '更新日志',
				link: 'https://github.com/vuepress/core/blob/main/CHANGELOG.md',
			},
			{
				text: 'v1.x',
				link: 'https://v1.vuepress.vuejs.org/',
			},
			{
				text: 'v0.x',
				link: 'https://v0.vuepress.vuejs.org/',
			},
		],
	},
]
