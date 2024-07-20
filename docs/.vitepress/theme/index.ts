import type {Theme} from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import '@shikijs/vitepress-twoslash/style.css'
import './styles/vars.css'
import NpmBadge from '../components/NpmBadge.vue'
import './css/custom.css'
export default {
	extends: DefaultTheme,
	enhanceApp({app}) {
		app.component('NpmBadge',NpmBadge)
	},
} satisfies Theme
