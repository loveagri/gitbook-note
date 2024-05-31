import type {Theme} from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'
import '@shikijs/vitepress-twoslash/style.css'
import './styles/vars.css'

export default {
	extends: DefaultTheme,
	enhanceApp({app}) {
		app.use(TwoslashFloatingVue)
	},
} satisfies Theme
