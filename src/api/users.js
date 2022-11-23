import request from './request'

export const getUsers = (params) => {
    return request(
        {
            url: '/users',
            method: 'GET', // 方法
            params // 接受用户填写的登录数据
        }
    )
}
