import Prism from 'prismjs'
import 'prismjs/themes/prism.css'

export default ({ app }) => {
  // 使用VitePress的API添加钩子或插件
  app.use({
    enhance({ Vue, options, router }) {
      Vue.mixin({
        mounted() {
          // 在组件挂载后，初始化Prism高亮
          Prism.highlightAll()
        }
      })
    }
  })
}
