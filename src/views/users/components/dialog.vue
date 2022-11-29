<template>
    <div>
        <!-- 通过dialogVisible来控制对话框展示与隐藏 -->
        <el-dialog :model-value="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
            <span>This is a message</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">Cancel</el-button>
                    <el-button type="primary" @click="dialogVisible = false">
                        Confirm
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue'
// 定义控制弹窗显隐的变量
const dialogVisible = ref(false)

// 接受父组件传过来的值
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})

watch(() => props.visible, (val) => {
    console.log('【dialog子组件监听到visible变化】visible：', val)
    dialogVisible.value = val
})

</script>

<style>

</style>
