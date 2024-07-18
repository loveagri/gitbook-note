import type {DefaultTheme} from 'vitepress';
import nav from '../scripts/nav'
import {notFound} from "./notFound";
import sidebar from "../scripts/sidebar"
import {algoliaSearchOptions} from './search/algolia-search';
import {localSearchOptions} from './search/local-search';

export const themeConfig: DefaultTheme.Config = {
	logo: '/logo.png',
	nav: [...nav()],
	sidebar: sidebar(),
	notFound,
	outline: {
		label: '目录', // 右侧大纲标题文本配置
		level: [2, 4],
		// level: 'deep', // 右侧大纲标题层级
	},

	darkModeSwitchLabel: '切换日光/暗黑模式',
	sidebarMenuLabel: '文3章',
	returnToTopLabel: '返回顶部',

	lastUpdated: {
		text: '最后更新',
		formatOptions: {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "numeric",
			minute: "2-digit",
			second: "numeric",
			hour12: false,
			timeZone: 'UTC',
		}
	},
	// 文档页脚文本配置
	docFooter: {
		prev: '上一篇',
		next: '下一篇'
	},

	// // 编辑链接配置
	// editLink: {
	// 	pattern: 'https://github.com/loveagri/vp/edit/master/docs/:path',
	// 	text: '不妥之处，请指正'
	// },

	footer: {
		message: `冀ICP备19024518号`,
		copyright: `京公网安备11010802043456`
	},

	socialLinks: [
		{icon: 'github', link: 'https://github.com/loveagri', ariaLabel: 'github'},
		{
			icon: {
				svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>码云</title><path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.016 0zm6.09 5.333c.328 0 .593.266.592.593v1.482a.594.594 0 0 1-.593.592H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.592.593.592h5.63c.982 0 1.778-.796 1.778-1.778v-.296a.593.593 0 0 0-.592-.593h-4.15a.592.592 0 0 1-.592-.592v-1.482a.593.593 0 0 1 .593-.592h6.815c.327 0 .593.265.593.592v3.408a4 4 0 0 1-4 4H5.926a.593.593 0 0 1-.593-.593V9.778a4.444 4.444 0 0 1 4.445-4.444h8.296Z"/></svg>'
			},
			link: 'https://gitee.com/loveagri'
		},
	],

	search: {
		// provider: 'algolia',  //https://dashboard.algolia.com/apps/4OY6VO2E9N/launchpad/import-data
		// options: algoliaSearchOptions,
		provider: 'local',
		options: localSearchOptions,
	},


}
