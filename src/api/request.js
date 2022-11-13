import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios对象
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

// 拦截器
service.interceptors.response.use(
    (response) => {
        // 有响应的处理
        // console.log('【拦截器处理前】', response)
        const { data, meta } = response.data // es6解构response.data对象拿到response.data.data与response.data.meta
        if (meta.status === 200 || meta.status === 201) { // 成功
            return data // response.data.data
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
