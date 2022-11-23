<template>
    <div @click="open">
        <!-- 点击图标事件 -->
        <el-icon>
            <component :is="isIconFullscreen ? 'Notification' : 'FullScreen'"></component>
        </el-icon>
    </div>
</template>

<script setup>
import screenfull from 'screenfull' // 导入全屏插件
import { ref, onMounted, onBeforeUnmount } from 'vue'
const isIconFullscreen = ref(screenfull.isFullscreen) // 全屏插件能否是全屏，返回布尔值

// 触发事件全屏缩屏切换
const open = () => {
    if (screenfull.isEnabled) { // 检测全屏插件能否使用
        screenfull.toggle() // 全屏缩屏切换
    }
}

const changeIcon = () => {
    isIconFullscreen.value = screenfull.isFullscreen
}
// 组件挂载完成后执行的函数:添加一个侦听器，浏览器进出全屏触发changeIcon回调函数
onMounted(() => {
    screenfull.on('change', changeIcon)
})
// 组件卸载之前执行的函数:删除以前注册事件侦听器
onBeforeUnmount(() => {
    screenfull.off('change')
})
</script>

<style lang="scss" scoped>

</style>
