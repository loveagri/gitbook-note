import type { HeadConfig } from 'vitepress';

export const head: HeadConfig[] = [
	['meta', {name: 'application-name', content: 'VuePress'}],
	['meta', {name: 'apple-mobile-web-app-title', content: '静思田园'}],
	['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}],
	['meta', {name: 'msapplication-TileColor', content: '#3eaf7c'}],
	['meta', {name: 'theme-color', content: '#646cff'}],
	// ['meta', {name: 'theme-color', content: '#3c8772'}]
	['meta', {name: 'HandheldFriendly', content: 'True'}],
	['meta', {name: 'MobileOptimized', content: '320'}],
]
