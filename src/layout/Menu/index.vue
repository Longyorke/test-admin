<template>
    <!-- 菜单组件 -->
    <el-menu active-text-color="#ffd04b" background-color="variables.menuBg" class="el-menu-vertical-demo"
        default-active="2" text-color="#fff" router unique-opened>
        <!-- 一级菜单标签 -->
        <el-sub-menu :index="item.id" v-for="item in  menuList" :key="item.id">
            <template #title>
                <!-- 等价于<template v-slot:title> -->
                <el-icon>
                    <icon-menu />
                </el-icon>
                <span>{{ item.authName }}</span>
            </template>
            <!-- 菜单项目组：与二级菜单同级，呈现灰色无法选中的文字 -->
            <el-menu-item :index="'/' + itemChild.path" v-for="itemChild in item.children" :key="itemChild.id">
                {{ itemChild.authName }}
            </el-menu-item>
        </el-sub-menu>

    </el-menu>
</template>

<script  setup>
import {
    // 注意大小写要与标签对应
    // Document as document,
    Menu as iconMenu
    // Location as location,
    // Setting
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { toMenuList } from '@/api/menu'

// 缓存菜单列表
const menuList = ref([])

// 定义初始化菜单函数，异步调用菜单列表请求
const initMenuList = async () => {
    menuList.value = await toMenuList() // 注意使用.value来操作ref中的数据
    console.log(menuList.value)
}

// 执行初始化菜单函数
initMenuList()
</script>

<style>

</style>
