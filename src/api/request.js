import axios from 'axios'
import { ElMessage } from 'element-plus'
import { diffTokenTime, getTokenTime, setTokenTime } from '@/utils/auth'
import store from '@/store'

// 创建axios对象
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        console.log('【进入请求拦截器】')
        // 判断是否超过有效时间
        if (getTokenTime()) { // 判断能从localStorage拿到对应时间token才进行设置
            if (diffTokenTime()) { // 超过时间返回真
                console.log('【超过登录有效期】')
                store.dispatch('app/logout') // vuex中相关退出操作
                return Promise.reject(new Error('token 失效了')) // 直接退出则不会在请求报头添加token需要重新登录
            }
            // 没有超过有效期
            setTokenTime()// 再次设置token的开始时间
        }
        config.headers.Authorization = localStorage.getItem('token') // 请求报头添加token
        return config
    },
    (error) => {
        return Promise.reject(new Error(error))
    }
)

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        // 有响应的处理
        // console.log('【拦截器处理前】', response)
        const { data, meta } = response.data // es6解构response.data对象拿到response.data.data与response.data.meta
        if (meta.status === 200 || meta.status === 201) { // 成功
            return data // 返回response.data.data
        } else { // 请求失败
            ElMessage.error(meta.msg) // 使用element-plus的消息提示框提示错误信息
            return Promise.reject(new Error(meta.msg))
        }
    },
    (error) => {
        // 无响应的处理
        // console.log('【无响应的处理】', error)
        error.response && ElMessage.error(error.response.data)
        return Promise.reject(new Error(error.response.data))
    }
)

export default service// 将对象暴露给外面
