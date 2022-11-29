<template>
  <!-- 卡片容器 -->
  <el-card>
    <!-- 行容器中标签之间间隔占整行比例为20 -->
    <el-row :gutter="20" class="header">
      <!-- 输入框占整行的宽度比例为7 -->
      <el-col :span="7">
        <el-input :placeholder="$t('table.placeholder')" v-model="queryForm.query" clearable="true">
        </el-input>
      </el-col>
      <!-- 搜索按钮 -->
      <el-button type="primary" :icon="Search" @click="initGetUsersList">{{
          $t('table.search')
      }}</el-button>
      <!-- 添加用户按钮 -->
      <el-button type="primary" :icon="Plus" @click="handleDialogValue">
        {{ $t('table.adduser') }}
      </el-button>
    </el-row>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">、
      <el-table-column :prop="item.prop" :label="$t(`table.${item.label}`)" v-for="(item, index) in options"
        :key="index" :width="item.width">
        <!-- 创建时间转换时间戳 -->
        <template v-slot="{ row }" v-if="item.prop === 'create_time'">
          {{ $filters.filterTimes(row.create_time) }}
        </template>
        <!-- 用户状态开关 -->
        <template v-slot="{ row }" v-else-if="item.prop === 'mg_state' ">
          <el-switch v-model="row.mg_state" @change="changeState(row)" />
        </template>
        <!-- 操作按钮 -->
        <template #default v-else-if="item.prop === 'action'">
          <el-button type="primary" size="small" :icon="Edit" />
          <el-button type="warning" size="small" :icon="Setting" />
          <el-button type="danger" size="small" :icon="Delete" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- current-page 当前页数，v-model 双向绑定为00 -->
    <!-- page-size 每页显示条目个数，v-model 双向绑定为00 -->
    <!-- page-sizes 每页显示个数选择器的选项设置 -->
    <!-- small 是否使用小型分页样式 -->
    <!-- disabled 是否禁用分页 -->
    <!-- background 是否为分页按钮添加背景色 -->
    <!-- layout 组件布局，子组件名用逗号分隔:总页数 每页个数选择器 前一页 具体哪一页 后一页 跳转-->
    <!-- total 总条目数 -->
    <!-- size-change page-size 改变时触发 参数为新的每页条数 -->
    <!-- current-change current-page 改变时触发 参数为新的当前页 -->
    <el-pagination v-model:current-page="queryForm.pagenum" v-model:page-size="queryForm.pagesize"
      :page-sizes="[2, 5, 10, 15]" :small="small" :disabled="disabled" :background="background"
      layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </el-card>
  <!-- 用户对话框组件 -->
  <Dialog v-model:visible="dialogVisible"></Dialog>
</template>

<script setup>
/* ================================vue内部组件===================================== */
import { ref } from 'vue'
/* ================================第三方组件===================================== */
import { Search, Edit, Setting, Delete, Plus } from '@element-plus/icons-vue' // 导入element-plus小图标
import { ElMessage } from 'element-plus' // 导入element-plus消息提示
import Dialog from './components/dialog.vue' // 导入对话框组件
/* ================================自定义组件===================================== */
import { getUsers, changeUserState } from '@/api/users.js'// 导入axios接口
import { options } from './options' // 导入Table-column 属性

/* ==================================国际化 begin===================================== */
// import i18n from '@/i18n' // 导入国际化方法一
import { useI18n } from 'vue-i18n' // 导入国际化方法二
const i18n = useI18n() // 拿到使用国际化对象
/* ==================================国际化 end===================================== */

/* ==================================对话框 begin===================================== */
// 对话框 dialogVisible变量来来控制对话框展示与隐藏 默认为false隐藏
const dialogVisible = ref(false)

// 点击对话框显示事件
const handleDialogValue = () => {
  console.log('【点击对话框显示事件】')
  dialogVisible.value = true
}
/* ==================================对话框 end===================================== */

/* ==================================获取用户数据 begin===================================== */
// 请求用户表单
const queryForm = ref({
  query: '',
  pagenum: 1, // 当前页数
  pagesize: 2 // 每页显示条目个数
})
// 用户表格数据缓存
const tableData = ref([])

// 单页总条目数
const total = ref(0)

// 调用获取用户数据接口
const initGetUsersList = async () => {
  const res = await getUsers(queryForm.value)
  console.log('【获取用户数据接口】', res)
  total.value = res.total
  tableData.value = res.users // 将用户数据取出放入表格数据缓存
}
initGetUsersList()
/* ==================================获取用户数据 end===================================== */

/* ==================================分页器 begin===================================== */
// 每页显示条目个数改变事件
const handleSizeChange = (pageSize) => {
  queryForm.value.pagenum = 1 // 将当前页数重新设置为1
  queryForm.value.pagesize = pageSize // 将前端事件拿到新的每页显示条目个数保存到queryForm中，继而绑定到page-size属性
  initGetUsersList()
}

// 当前页数改变事件
const handleCurrentChange = (pageNum) => {
  queryForm.value.pagenum = pageNum // 将当前页数重新设置为传入参数对应的页数
  initGetUsersList()
}
/* ==================================分页器 end===================================== */

/* ==================================修改用户状态 begin===================================== */
// 点击修改用户状态按钮事件
const changeState = async (info) => {
  console.log('【被修改状态的用户信息】', info)
  await changeUserState(info.id, info.mg_state) // 调用请求用户状态接口
  ElMessage({
    message: i18n.t('message.updateSuccess'),
    type: 'success'
  })
}
/* ==================================修改用户状态 end===================================== */

</script>

<style lang="scss" scoped>
.header {
  /* 搜索行与表格有一定间距 */
  padding-bottom: 16px;
  box-sizing: border-box;
}

// ::v-deep .el-input__suffix {
//   align-items: bottom;
// }
</style>
