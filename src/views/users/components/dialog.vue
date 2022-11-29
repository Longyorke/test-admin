<template>
    <div>
        <!-- 通过dialogVisible来控制对话框展示与隐藏 -->
        <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
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
import { defineProps, defineEmits, computed } from 'vue'

// 接受父组件传过来的值
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    }
})
// 触发父组件传过来的值
const emit = defineEmits(['update:visible'])
// 计算属性：控制弹窗显隐 get方法返回v-model参数对应prop，set需触发对应事件
const dialogVisible = computed({
    get() {
        return props.visible
    },
    set(visible) {
        emit('update:visible', visible)
    }
})

</script>

<style>

</style>
