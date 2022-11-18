<template>
    <div class="hamburger-container" @click="toggleClick" id="hamburger">
        <el-icon>
            <component :is="icon"></component> <!-- 对应上才展示 -->
        </el-icon>
    </div>
</template>

<script setup>
import { useStore } from 'vuex' // 使用vuex的store
import { computed } from 'vue'
const store = useStore()
const toggleClick = () => {
    store.commit('app/changeSiderType')
}
const icon = computed(() => {
    // 监控store.getters.siderType从而选取对应element-plus图标
    return store.getters.siderType ? 'expand' : 'fold'
})
</script>

<style lang="scss" scoped>
.hamburger-container {
    margin-right: 16px; // 边距
    box-sizing: border-box;
    cursor: pointer; // 鼠标悬停为小手状态
}
</style>
