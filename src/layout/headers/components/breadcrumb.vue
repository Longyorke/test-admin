<template>
    <!-- 使用箭头分隔 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <!-- 遍历拿到每个路由 -->
        <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
            <!-- 如果是最后一项：不可点击-->
            <span class="no-redirect" v-if="index === breadcrumbList.length - 1">
                {{ item.name }}
            </span>
            <!-- 若不是最后一项：可点击跳转 handleRedirect(【传入对应路由】) -->
            <span class="redirect" v-else @click="handleRedirect(item.path)">
                {{ item.name }}
            </span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute() // 当前路由
const router = useRouter() // 整个路由器

const breadcrumbList = ref([]) // 保存路由表

// 将路由表保存到数组，由于watch监听器有立即执行配置项，要放在watch监听器上面
const initBreadcrumbList = () => {
    breadcrumbList.value = route.matched
    console.log('【当前路由】', route.matched)
}
// 若不是最后一项：可点击跳转的函数
const handleRedirect = (path) => {
    router.push(path)
}

// 监听点击菜单项目时route对应路由表的变化
watch(
    route,
    () => {
        initBreadcrumbList()
    },
    { deep: true, immediate: true } // 配置项
)
</script>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';

.no-redirect {
    color: #97a8be;
    cursor: text;
}

.redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        color: $menuBg;
    }
}
</style>
