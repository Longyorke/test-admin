import request from './request'

// 用户数据列表
export const getUsers = (params) => {
    return request(
        {
            url: '/users',
            method: 'GET', // 方法
            params // 接受用户填写的登录数据
        }
    )
}

// 修改用户状态
export const changeUserState = (uid, type) => {
    return request({
        url: `/users/${uid}/state/${type}`, // 将输入参数格式化到路由地址中
        method: 'PUT' // 方法
    })
}

// 添加用户接口
export const addUser = (data) => {
    return request({
        url: '/users', // 将输入参数格式化到路由地址中
        method: 'POST', // 方法
        data // 添加的新用户数据
    })
}
