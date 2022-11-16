import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import 'element-plus/dist/index.css' // element-plus叠层样式表
import '@/router/permission' // 直接导入permission.js相当于将该文件的代码粘贴到此处
import * as ELIcons from '@element-plus/icons-vue' // element-plus小图标
// 注意导入使用的是单引号

const myApp = createApp(App)

for (const iconName in ELIcons) { // 遍历导入所有小图标组件
    myApp.component(iconName, ELIcons[iconName]) // 名字作为组件名
}

myApp.use(store).use(router).mount('#app')
