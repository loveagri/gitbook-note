import {defineConfig} from 'vitepress'
import {transformerTwoslash} from '@shikijs/vitepress-twoslash'

import {head} from './configs/head'
import {markdown} from './configs/markdown'
import {themeConfig} from './configs/theme'

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
	themeConfig,

	rewrites: {
		'packages/:pkg/src/(.*)': ':pkg/index.md'
	}

})
