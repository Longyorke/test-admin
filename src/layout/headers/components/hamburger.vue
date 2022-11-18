<template>
    <div class="hamburger-container" @click="toggleClick" id="hamburger">
        <svg-icon :icon="icon"></svg-icon>
    </div>
</template>
   
<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const toggleClick = () => {
    store.commit('app/changeSiderType')
}
const icon = computed(() => {
    return store.getters.siderType ? 'hamburger-opened' : 'hamburger-closed'
})
</script>
   
<style lang="scss" scoped>
.hamburger-container {
    margin-right: 16px; // 边距
    box-sizing: border-box;
    cursor: pointer; // 鼠标悬停为小手状态
}
</style>