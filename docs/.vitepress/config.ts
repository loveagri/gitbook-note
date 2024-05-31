import {defineConfig} from 'vitepress'
import {transformerTwoslash} from '@shikijs/vitepress-twoslash'
import nav from './scripts/nav'
import sidebar from "./scripts/sidebar";

export default defineConfig({
	title: "静思田园",
	description: '时不时记录一点点',
	base: '',//如果你使用的是 Github（或 GitLab）页面并部署到 user.github.io/repo/，请将 base 设置为 /repo/
	outDir: '../dist',
	cacheDir: '../cache',

	metaChunk: true,
	lastUpdated: true,
	srcExclude: ['public'],


	head: [
		['meta', {name: 'theme-color', content: '#646cff'}],
	],

	rewrites: {
		'packages/:pkg/src/(.*)': ':pkg/index.md'
	},

	markdown: {
		container: {
			tipLabel: '提示',
			warningLabel: '警告',
			dangerLabel: '危险',
			infoLabel: '信息',
			detailsLabel: '详细信息'
		},
		lineNumbers: true,
		math: true,
		image: {
			lazyLoading: true
		},
		codeTransformers: [transformerTwoslash()],
	},

	themeConfig: {
		logo: '/images/logo.png',
		nav: [...nav()],
		sidebar: sidebar(),

		outline: {
			level: [2, 3],
		},
		// copyright: `<div style="display: flex;justify-content: center;color: #3eaf7c;font-size: 1rem" ><a
		// style="text-decoration: none;color: #3eaf7c;" href="https://beian.miit.gov.cn/">冀ICP备19024518号-1</a> </div><p style="display: flex;justify-content: center;color: #3eaf7c;font-size: 1rem" >  <a  style="text-decoration: none;color: #3eaf7c;" href="https://beian.mps.gov.cn/#/query/webSearch?code=11010802043456" rel="noreferrer" target="_blank">京公网安备11010802043456</a></p>`

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



		// carbonAds: {
		// 	code: 'fuhong',
		// 	placement: 'love'
		// }

	}
})
