import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
// 注意导入使用的是单引号

createApp(App).use(store).use(router).mount('#app')
