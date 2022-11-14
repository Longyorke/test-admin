import router from './index' // 拿到路由器对象，用于调用路由守卫
import store from '@/store' // 等同于@/store/index.js

// 白名单：用户没有登录也可以访问的页面
const whiteList = ['/login']

// 全局前置守卫
router.beforeEach((to, from, next) => {
    if (store.getters.token) {
        // 若存在token
        if (to.path === '/login') {
            // 原要前往登录页面，修改跳转到根目录下
            next('/')
        } else {
            // 原要前往 除登录页面外 其他页面
            next() // 直接跳转
        }
    } else {
        // 若不存在token
        if (whiteList.includes(to.path)) {
            // 如果白名单包含原要前往的页面
            next() // 直接跳转
        } else {
            // 如果白名单不包含原要前往的页面
            next('/login') // 跳转到登录页面
        }
    }
})
