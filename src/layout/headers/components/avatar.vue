<template>
    <el-dropdown>
        <span class="el-dropdown-link">
            <!-- 下拉菜单 -->
            <el-avatar shape="square" :size="40" :src="squareUrl"></el-avatar> <!-- 用户头像 -->
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <!-- 下拉项只保留退出 -->
                <el-dropdown-item @click="logout">退出</el-dropdown-item> <!-- 退出事件 -->
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const squareUrl = ref(
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.doubanio.com%2Fview%2Fgroup_topic%2Fl%2Fpublic%2Fp427259916.jpg&refer=http%3A%2F%2Fimg9.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671509737&t=17ec96a27f65c906311ecbcd3783a02d'
)

// 使用vuex中mutation实现了的退出函数
const logout = () => {
    store.dispatch('app/logout')
}
</script>

<style lang="scss" scoped>
::v-deep .el-dropdown-menu__item {
    // 深度选择器
    white-space: nowrap; // 不换行
}
</style>
