<template>
    <div class="common-layout">
        <!-- 容器 -->
        <el-container class="app-wrapper">
            <!-- 侧栏 -->
            <el-aside :width="sideBarWidth" class="sidebar-container">
                <!-- 菜单 -->
                <Menu></Menu>
            </el-aside>
            <!-- 容器 -->
            <el-container class="container" :class="{ hidderContainer: !$store.getters.siderType }">
                <!-- 头部 -->
                <el-header>
                    <Headers></Headers>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main> <!-- 主要内容 -->
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import Menu from './menu'
import Headers from './headers'
import variables from '@/styles/variables.module.scss'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const sideBarWidth = computed(() => {
    return store.getters.siderType ? variables.sideBarWidth : variables.hideSideBarWidth
})
// const sideBarWidth = ref(variables.sideBarWidth)

</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';

.app-container {
    position: relative;
    width: 100%;
    height: 100%;
}

.container {
    width: calc(100% - $sideBarWidth); // $sideBarWidth为变量值，可以在vue.config.js进行全局导入
    height: 100%;

    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    transition: all 0.28s;

    &.hidderContainer {
        width: calc(100% - $hideSideBarWidth);
    }
}

::v-deep .el-header {
    padding: 0;
}
</style>
