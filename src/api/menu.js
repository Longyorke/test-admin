import request from './request'

// 菜单列表请求
export const toMenuList = () => {
    return request({
        url: '/menus', // 地址
        method: 'GET' // GET方法可以省略
    })
}
