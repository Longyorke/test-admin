<template>
    <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
            <el-icon>
                <SetUp />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="zh" :disabled="currentLanguage === 'zh'">中文</el-dropdown-item>
                <el-dropdown-item command="en" :disabled="currentLanguage === 'en'">English</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const i18n = useI18n() // 在src/i18n/index.js中创建，此处使用

// 计算属性，语言码
const currentLanguage = computed(() => {
    return i18n.locale.value // 拿到语言码
})

// el-dropdown的事件，参数由el-dropdown-item的command派发
const handleCommand = (val) => {
    // console.log('【选中菜单项目返回对应语言参数】', val)
    i18n.locale.value = val // 改变i18n对象中语言码，进而触发计算属性，el-dropdown-item进行对应禁用渲染
    store.commit('app/changeLanguage', val) // 存到vuex
    localStorage.setItem('language', val) // 存到localStorage中
}
</script>

<style lang="scss" scoped>

</style>
