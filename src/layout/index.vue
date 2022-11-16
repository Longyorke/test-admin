<template>
    <div class="common-layout">
        <!-- 容器 -->
        <el-container class="app-wrapper">
            <el-aside width="200px" class="sidebar-container">
                <Menu></Menu>
            </el-aside> <!-- 侧栏 -->
            <!-- 容器 -->
            <el-container class="container">
                <el-header>Header</el-header> <!-- 头部 -->
                <el-main>
                    <router-view></router-view>
                </el-main> <!-- 主要内容 -->
            </el-container>
        </el-container>
    </div>
</template>

<script setup>
import Menu from './Menu'

</script>

<style lang="scss" scoped>
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
