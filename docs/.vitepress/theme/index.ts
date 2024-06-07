import type {Theme} from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import '@shikijs/vitepress-twoslash/style.css'
import './styles/vars.css'
import NpmBadge from '../components/NpmBadge.vue'
export default {
	extends: DefaultTheme,
	enhanceApp({app}) {
		app.use(TwoslashFloatingVue)
		app.component('NpmBadge',NpmBadge)
	},
} satisfies Theme
