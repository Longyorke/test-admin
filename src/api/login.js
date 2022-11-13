import request from './request.js'

export const login = (data) => {
    return request({
        url: '/login', // 地址
        method: 'POST', // 方法
        data // 接受用户数据
    })
}
