import { login as loginApi } from '@/api/login' // 起个别名防止冲突
import router from '@/router'
import { setTokenTime } from '@/utils/auth'

export default {
    namespaced: true, // 使用命名空间，app/token 防止重名报错
    state: {
        token: localStorage.getItem('token') || '', // 先获取指定key本地存储的值 ，取不到才设置为空字符串
        siderType: true
    },
    // 同步修改
    mutations: {
        setToken(state, token) {
            state.token = token // 将传入的token参数存入vuex状态中的token
            localStorage.setItem('token', token) // 本地存储传入的token参数
        },
        changeSiderType(state) {
            state.siderType = !state.siderType // 将展开状态取反
        }
    },
    // 异步操作
    actions: {
        // Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，
        // 因此可以调用 context.commit 提交一个 mutation，
        // 或者通过 context.state 和 context.getters 来获取 state 和 getters

        // 下面通过解构方式使用 commit
        // token 来自登录页面 点击登录之后，所以不如直接放到actions中
        login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                loginApi(userInfo)
                    .then((res) => {
                        // 登录成功
                        console.log('【登录成功】', res)
                        commit('setToken', res.token) // 存储登录token
                        setTokenTime() // 存储登录时间
                        router.replace('/') // 登录成功后应返回到首页
                        resolve() // 执行回调函数resolve()
                    })
                    .catch((err) => {
                        // 登录失败
                        reject(err) // 执行回调函数reject()，并传入err参数
                    })
            })
        },
        // 退出当前登录
        logout({ commit }) {
            commit('setToken', '') // 清空localStorage与vuex的state中的token键对应的值
            localStorage.clear() // 清除localStorage，目的是清除localStorage中的TOKEN_TIME
            // 跳转到登录页面
            router.replace('/login') // 作用类似于 router.push，不同的在导航时不会向 history 添加新记录
        }
    }
}
