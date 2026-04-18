import { createApp } from 'vue'
import App from './App.vue'

// 1. 引入 Element Plus
import ElementPlus from 'element-plus'
// 2. 引入 Element Plus 的样式
import 'element-plus/dist/index.css'
// 3. 引入所有图标 (或者按需引入具体图标)
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'nprogress/nprogress.css' 
import { createPinia } from 'pinia'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)

// 4. 使用 Element Plus 插件
app.use(ElementPlus)

// 5. 注册所有图标 (这样你就可以在模板中直接使用 <User />, <Lock /> 等组件)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')