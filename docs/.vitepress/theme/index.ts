import type {Theme} from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import '@shikijs/vitepress-twoslash/style.css'
import './styles/vars.css'
import './styles/custom.css'
import NpmBadge from './components/NpmBadge.vue'
export default {
	extends: DefaultTheme,
	enhanceApp({app}) {
		app.component('NpmBadge',NpmBadge)
	},
} satisfies Theme
