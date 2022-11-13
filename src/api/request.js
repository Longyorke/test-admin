import axios from 'axios'
// 创建axios对象
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
})

export default service// 将对象暴露给外面
