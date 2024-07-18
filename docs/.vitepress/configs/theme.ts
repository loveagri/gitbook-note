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
		message: '<p  style="display: flex;justify-content: center;color: #3eaf7c;"><svg style="width: 16px"' +
			' data-v-33cfc005="" viewBox="0 0 1024 1024" version="1.1"' +
			' xmlns="http://www.w3.org/2000/svg"><title data-v-33cfc005="">ICP备案号</title><path data-v-33cfc005=""' +
			' d="M778.24 163.84c-76.8-40.96-165.888-61.44-269.312-61.44s-192.512 20.48-269.312 61.44h-133.12l23.552' +
			' 337.92c8.192 113.664 67.584 217.088 162.816 280.576l215.04 144.384 215.04-144.384c96.256-63.488' +
			' 155.648-166.912 163.84-280.576l23.552-337.92H778.24z m47.104 333.824c-7.168 94.208-56.32' +
			' 181.248-135.168 233.472l-181.248 120.832L327.68' +
			' 731.136c-78.848-53.248-129.024-139.264-135.168-233.472L173.056 225.28h136.192v-26.624c58.368-23.552' +
			' 124.928-34.816 199.68-34.816s141.312 12.288 199.68 34.816V225.28H844.8l-19.456 272.384z"></path><path' +
			' data-v-33cfc005="" d="M685.056 328.704v-46.08H455.68c2.048-4.096 6.144-9.216 11.264-15.36 5.12-7.168' +
			' 9.216-12.288 11.264-15.36L419.84 240.64c-31.744 46.08-75.776 87.04-133.12 123.904 4.096 4.096 10.24' +
			' 11.264 18.432 21.504l17.408 17.408c23.552-15.36 45.056-31.744 63.488-50.176 26.624 25.6 49.152 43.008' +
			' 67.584 51.2-46.08 15.36-104.448 27.648-175.104 35.84 2.048 5.12 6.144 13.312 9.216 24.576 4.096 11.264' +
			' 6.144 19.456 7.168' +
			' 24.576l39.936-7.168v218.112H389.12V680.96h238.592v19.456h54.272V481.28H348.16c60.416-12.288' +
			' 114.688-27.648 163.84-46.08 49.152 19.456 118.784 34.816 210.944 46.08 5.12-17.408 10.24-34.816' +
			' 17.408-51.2-62.464-4.096-116.736-12.288-161.792-24.576 38.912-20.48 74.752-46.08 106.496-76.8z' +
			' m-150.528 194.56h94.208v41.984h-94.208v-41.984z m0 78.848h94.208v41.984h-94.208v-41.984z' +
			' m-144.384-78.848h94.208v41.984H390.144v-41.984z m0 78.848h94.208v41.984H390.144v-41.984zM424.96' +
			' 326.656h182.272c-26.624 22.528-57.344 41.984-94.208' +
			' 57.344-31.744-15.36-61.44-34.816-88.064-57.344z"></path></svg>冀ICP备19024518号-1</p>' +
			'<p style="display: flex;justify-content: center; align-items:center;color: #3eaf7c;">' +
			'<img style="width:16px;height: 16px" src="/gongan.png" title="联网备案号">京公网安备11010802043456</p>',
		copyright: `<p style="display: flex;justify-content: center; align-items:center;color: #3eaf7c;">Copyright © 2019-${new Date().getFullYear()} loveagri</p>`
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
		provider: 'algolia',  //https://dashboard.algolia.com/apps/4OY6VO2E9N/launchpad/import-data
		options: algoliaSearchOptions,
		// provider: 'local',
		// options: localSearchOptions,
	},


}
