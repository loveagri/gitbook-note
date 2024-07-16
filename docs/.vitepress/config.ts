import {defineConfig} from 'vitepress'
import {transformerTwoslash} from '@shikijs/vitepress-twoslash'
import nav from './scripts/nav'
import sidebar from "./scripts/sidebar"
import {head} from './configs/head'
import {markdown} from './configs/markdown'


export default defineConfig({
	lang: 'zh-CN',
	title: "静思田园",
	description: '时不时记录一点点',

	cleanUrls: false,
	base: '',//如果你使用的是 Github（或 GitLab）页面并部署到 user.github.io/repo/，请将 base 设置为 /repo/
	outDir: '../dist',
	cacheDir: '../cache',

	metaChunk: true,
	lastUpdated: true,
	srcExclude: ['public'],

	head: head,
	markdown: markdown,

	rewrites: {
		'packages/:pkg/src/(.*)': ':pkg/index.md'
	},

	themeConfig: {
		logo: '/logo.png',
		nav: [...nav()],
		sidebar: sidebar(),

		outline: {
			level: [2, 4],
		},

		footer: {
			message: '',
			copyright: ` <span style="display: flex;justify-content: center;color: #3eaf7c;font-size: 1rem" >冀ICP备19024518号-1</span><span style="display: flex;justify-content: center;color: #3eaf7c;font-size: 1rem" >京公网安备11010802043456</span>`
		},

		socialLinks: [
			{icon: 'github', link: 'https://github.com/loveagri', ariaLabel: 'github'},
		],

		search: {
			provider: 'local'
		}
	},

})
