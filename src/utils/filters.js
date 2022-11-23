import * as dayjs from 'dayjs'

// 传入时间戳val，转换格式（默认参数）
const filterTimes = (val, format = 'YYYY-MM-DD') => {
    if (!isNull(val)) {
        // 若时间戳存在
        val = parseInt(val) * 1000 // 字符串转成数字 十位时间戳
        return dayjs(val).format(format)
    }
    // 时间戳不存在
    return '--'
}

// 判断数据是否为空
export const isNull = (data) => {
    if (!data) return true
    if (JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]') return true
}

export default (app) => {
    app.config.globalProperties.$filters = { filterTimes }
}
