import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'// element-plus叠层样式表
// 注意导入使用的是单引号

createApp(App).use(store).use(router).mount('#app')
