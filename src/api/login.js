import request from './request.js'

// 登录请求
export const login = (data) => {
    return request({
        url: '/login', // 地址
        method: 'POST', // 方法
        data // 接受用户填写的登录数据
    })
}
