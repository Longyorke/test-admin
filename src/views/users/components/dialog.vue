<template>
    <div>
        <!-- 通过dialogVisible来控制对话框展示与隐藏 -->
        <el-dialog v-model="dialogVisible" :title="dialogTitle" width="40%" @close="handleClose">
            <!-- 表单 -->
            <el-form ref="formRef" :model="dynamicValidateForm" label-width="70px" :rules="rules">
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="dynamicValidateForm.username" />
                </el-form-item>
                <el-form-item prop="password" label="密码" v-if="dialogTitle === '添加用户'">
                    <el-input v-model="dynamicValidateForm.password" type="password" />
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
                    <el-input v-model="dynamicValidateForm.email" />
                </el-form-item>
                <el-form-item prop="mobile" label="手机">
                    <el-input v-model="dynamicValidateForm.mobile" />
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="handleClose">取消</el-button>
                    <el-button type="primary" @click="handleConfirm">确认</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref, watch } from 'vue'
import { addUser, editUser } from '@/api/users'
import i18n from '@/i18n' // 自定义的国际化对象
import { ElMessage } from 'element-plus'

// element-plus表单DOM 组件引用
const formRef = ref()
// element-plus表单数据对象
const dynamicValidateForm = ref({
    username: '',
    password: '',
    email: '',
    mobile: ''
})
// 表单验证规则
const rules = ref(
    {
        username: [
            { required: true, message: 'Please input Activity username', trigger: 'blur' },
            { min: 3, max: 15, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        password: [
            { required: true, message: 'Please input Activity password', trigger: 'blur' }
        ],
        email: [
            { required: true, message: 'Please input Activity email', trigger: 'blur' },
            {
                type: 'email',
                message: 'Please input correct email address',
                trigger: ['blur', 'change']
            }
        ],
        mobile: [
            { required: true, message: 'Please input Activity mobile', trigger: 'blur' },
            {
                pattern: '' // 正则表达式
            }
        ]
    }
)

// 接受父组件传过来的值
const props = defineProps({
    // 对话框是否显示标志位
    visible: {
        type: Boolean,
        default: false
    },
    // 对话框标题
    dialogTitle: {
        type: String,
        default: '',
        required: true
    },
    // 对话框缓存用户表格行数据
    dialogTitleRowData: {
        type: Object,
        default: () => { }
    }

})
// 监听 用户表格行数据
watch(() => { return props.dialogTitleRowData }, () => {
    console.log('【对话框组件监听】', props.dialogTitleRowData)
    dynamicValidateForm.value = props.dialogTitleRowData // 对应的用户表格行数据放到表单中作为默认值
}, {
    deep: true,
    immediate: true
})

// 发送触发父组件事件
const emits = defineEmits(['update:visible', 'toGetUsersList'])
// 计算属性：控制弹窗显隐 get方法返回v-model参数对应prop，set需触发对应事件
const dialogVisible = computed({
    get() {
        return props.visible
    },
    set(visible) {
        emits('update:visible', visible)
    }
})

// 关闭事件
const handleClose = () => {
    emits('update:visible', false)
    console.log('【关闭对话框事件】发射update:visible事件给父组件，并携带参数为', false)
}

// 确认事件
const handleConfirm = () => {
    // 统一校验
    formRef.value.validate(async (valid, fields) => {
        if (valid) {
            // 验证成功
            // 根据对话框标题确定调用axios哪个接口
            props.dialogTitle === '添加用户'
                ? await addUser(dynamicValidateForm.value) // axios添加新的用户 注意参数要为ref的value解引用
                : await editUser(dynamicValidateForm.value) // axios编辑更新用户
            emits('toGetUsersList') // 发送给父组件重新获取一次用户列表
            ElMessage({
                message: i18n.global.t('message.updateSuccess'),
                type: 'success'
            })
            handleClose() // 关闭对话框
        } else {
            // 校验失败
            console.log('error submit!', fields)
        }
    })
}

</script>

<style>

</style>
