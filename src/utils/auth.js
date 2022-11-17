import { TOKEN_TIME, TOKEN_TIME_VALUE } from './constant'

// 设置登录时时间
export const setTokenTime = () => { localStorage.setItem(TOKEN_TIME, Date.now()) }

// 获取登录时时间 要拿到对应时间还需压return
export const getTokenTime = () => { return localStorage.getItem(TOKEN_TIME) }

// 比较是否过期
// 超过时间返回真
export const diffTokenTime = () => {
    const currentTime = Date.now()
    const tokenTime = getTokenTime()
    return currentTime - tokenTime > TOKEN_TIME_VALUE // 如果登录时间至当前时间的间隔大于设置的有效时间返回真
}
