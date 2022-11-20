import { createI18n } from 'vue-i18n'
import EN from './en'
import ZH from './zh'

const messages = { // 数据源
    // 不同语言对应的内容
    en: {
        ...EN
    },
    zh: {
        ...ZH
    }
}

// 设置当前的语言到localStorage，并返回语言码
const getCurrentLanguage = () => {
    const UAlang = navigator.language // 浏览器会自动识别当前语言 zh-CN
    console.log('【当前语言】', UAlang)
    const langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : 'en' // 如果数组里面有zh，则满足不为-1
    localStorage.setItem('lang', langCode) // 将语言存至localStorage
    return langCode
}

const i18n = createI18n({
    legacy: false, // vue3.2 composition API
    globalInjection: true, // 全局的函数
    locale: getCurrentLanguage() || 'zh', // 如果没拿到返回的语言码，则默认中文
    messages: messages // 数据源
})

export default i18n
