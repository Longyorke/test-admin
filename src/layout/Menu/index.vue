<template>
    <!-- 菜单组件 -->
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
        text-color="#fff" @open="handleOpen" @close="handleClose">
        <!-- 一级菜单标签 -->
        <el-sub-menu index="1">
            <template #title>
                <!-- 等价于<template v-slot:title> -->
                <el-icon>
                    <location />
                </el-icon>
                <span>Navigator One</span>
            </template>
            <!-- 菜单项目组：与二级菜单同级，呈现灰色无法选中的文字 -->
            <el-menu-item-group title="Group One">
                <!-- 菜单项目 与二级菜单同级 -->
                <el-menu-item index="1-1">item one</el-menu-item>
                <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
                <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <!-- 二级菜单下拉标签 -->
            <el-sub-menu index="1-4">
                <template #title>item four</template>
                <!-- 菜单项目 与三级菜单同级 -->
                <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="2">
            <el-icon>
                <icon-menu />
            </el-icon>
            <span>Navigator Two</span>
        </el-menu-item>
        <!-- 一级菜单标签：不可用 -->
        <el-menu-item index="3" disabled>
            <el-icon>
                <document />
            </el-icon>
            <span>Navigator Three</span>
        </el-menu-item>
        <el-menu-item index="4">
            <el-icon>
                <setting />
            </el-icon>
            <span>Navigator Four</span>
        </el-menu-item>
    </el-menu>
</template>

<script  setup>
import {
    Document as document, // 注意大小写要与标签对应
    Menu as IconMenu,
    Location as location,
    Setting
} from '@element-plus/icons-vue'
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}
</script>

<style>

</style>
