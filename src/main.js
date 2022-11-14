import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import 'element-plus/dist/index.css'// element-plus叠层样式表
import '@/router/permission' // 直接导入permission.js相当于将该文件的代码粘贴到此处
// 注意导入使用的是单引号

createApp(App).use(store).use(router).mount('#app')
