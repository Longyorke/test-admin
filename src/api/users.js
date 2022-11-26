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
