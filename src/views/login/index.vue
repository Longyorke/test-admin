<template>
    <div class="login-container">
        <!-- 从element-plus拿到表单代码 -->
        <!-- 动态绑定属性model的内容为setup中设置的form变量 -->
        <el-form ref="ruleFormRef" :model="form" class="login-form" :rules="rules">
            <div class="title-container">
                <h3 class="title">用户登录</h3>
            </div>
            <!-- 表单中每个表单输入项目 -->
            <el-form-item prop='username'>
                <!-- icon图标：用户 -->
                <el-icon :size="20" class="svg-container">
                    <User />
                </el-icon>
                <!-- 表单输入 -->
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item prop='password'>
                <!-- icon图标：密码锁 -->
                <el-icon :size="20" class="svg-container">
                    <Lock />
                </el-icon>
                <el-input v-model="form.password" type='password' show-password=true />
            </el-form-item>
            <el-button type="primary" class="login-button" @click="submitForm()">登录</el-button>
        </el-form>
    </div>
</template>

<script setup>
import { ref } from 'vue' // 从vue导入ref
import { User, Lock } from '@element-plus/icons-vue' // 从element-plus引入编写图标
import { useStore } from 'vuex'

const store = useStore() // 拿到vuex的全局store
// import { reactive } from "vue";
// const user = reactive({ user_username: 'LongYorke', password: '123456', })
const form = ref({ // vue3.0 ref只能创建基础类型vue3.2中使用ref创建对象底层实际上也会reactive进行实现
    username: 'admin',
    password: '123456'
})

// 表单验证
const rules = ref({
    username: [
        { required: true, message: 'Please input Activity user name', trigger: 'blur' },
        { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' }
    ],
    password: [
        { required: true, message: 'Please input Activity user name', trigger: 'blur' },
        { min: 3, max: 15, message: 'Length should be 3 to 15', trigger: 'blur' }
    ]
})

const ruleFormRef = ref(null) // 声明一个变量用于缓存 ref 属性涉及Dom 元素的获取

// 提交触发统一校验异步函数
const submitForm = async () => {
    await ruleFormRef.value.validate(async (valid, fields) => {
        if (valid) {
            store.dispatch('app/login', form.value) // 派发给app/login()函数 userInfo 为 form.value
        } else {
            console.log('error submit!', fields)
            alert('error submit!')
        }
    })
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;

        :deep(.el-form-item) {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
            height: 50px;

            .el-input {
                flex: 1;

                .el-input__wrapper {
                    background-color: transparent;
                    box-shadow: none;

                    .el-input__inner {
                        color: #fff;
                    }
                }
            }
        }

        .login-button {
            width: 100%;
            box-sizing: border-box;
        }
    }

    .tips {
        font-size: 16px;
        line-height: 28px;
        color: #fff;
        margin-bottom: 10px;

        span {
            &:first-of-type {
                margin-right: 16px;
            }
        }
    }

    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }

        :deep(.lang-select) {
            position: absolute;
            top: 4px;
            right: 0;
            background-color: white;
            font-size: 22px;
            padding: 4px;
            border-radius: 4px;
            cursor: pointer;
        }
    }

    .show-pwd {
        // position: absolute;
        // right: 10px;
        // top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
}
</style>
