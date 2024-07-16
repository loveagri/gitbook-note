import type {DefaultTheme} from 'vitepress';
import nav from '../scripts/nav'
import sidebar from "../scripts/sidebar"

export const themeConfig: DefaultTheme.Config = {
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
}
