<template>
    <!-- 菜单组件 -->
    <el-menu active-text-color="#ffd04b" background-color="variables.menuBg" class="el-menu-vertical-demo"
        :default-active="defaultActive" text-color="#fff" router unique-opened>
        <!-- 一级菜单标签 -->
        <el-sub-menu :index="item.id + ''" v-for="( item, index ) in  menuList" :key="item.id">
            <template #title>
                <!-- 等价于<template v-slot:title> -->
                <el-icon>
                    <component :is="iconListFisrtOrder[index]"></component> <!-- 对应上才展示 -->
                </el-icon>
                <span>{{ item.authName }}</span>
            </template>
            <el-menu-item :index="'/' + itemChild.path" v-for="itemChild in item.children" :key="itemChild.id"
                @click="savePath(itemChild.path)">
                <template #title>
                    <!-- 等价于<template v-slot:title> -->
                    <el-icon>
                        <component :is="iconListSecondOrder"></component> <!-- 对应上才展示 -->
                    </el-icon>
                    <span>{{ itemChild.authName }}</span>
                </template>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script  setup>
import { ref } from 'vue'
import { getMenuList } from '@/api/menu'

// 图表
const iconListFisrtOrder = ref(['user', 'setting', 'shop', 'tickets', 'pie-chart']) // 一级图标
const iconListSecondOrder = ref('menu') // 二级图标

// 默认激活的index（此处index设置为对应路由）
// 如果session存储了则取对应path键值对，否则默认用/users
const defaultActive = ref(sessionStorage.getItem('path') || '/users')
// 实现点击菜单项目后保存对应路由到sessionStorage中
const savePath = (path) => {
    sessionStorage.setItem('path', `/${path}`)
}

// 缓存菜单列表
const menuList = ref([])
// 定义初始化菜单函数，异步调用菜单列表请求
const initMenuList = async () => {
    menuList.value = await getMenuList() // 注意使用.value来操作ref中的数据
    console.log(menuList.value)
}

// 执行初始化菜单函数
initMenuList()
</script>

<style>

</style>
