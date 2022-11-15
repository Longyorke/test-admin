import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded w../views/login/LoginIndex.vue.
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/',
    name: '/',
    component: () => { return import('../layout/index.vue') }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
