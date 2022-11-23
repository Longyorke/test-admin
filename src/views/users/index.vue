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
      <el-button type="primary" :icon="Search">{{
          $t('table.search')
      }}</el-button>
      <!-- 添加用户按钮 -->
      <el-button type="primary">
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
        <template v-slot="{ row }" v-else-if="item.prop === 'mg_state'">
          <el-switch v-model="row.mg_state" />
        </template>
        <!-- 操作按钮 -->
        <template #default v-else-if="item.prop === 'action'">
          <el-button type="primary" size="small" :icon="Edit" />
          <el-button type="warning" size="small" :icon="Setting" />
          <el-button type="danger" size="small" :icon="Delete" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref } from 'vue'
import { Search, Edit, Setting, Delete } from '@element-plus/icons-vue'
import { getUsers } from '@/api/users.js'
import { options } from './options' // 导出Table-column 属性
const queryForm = ref({
  query: '',
  pagenum: 1,
  pagesize: 2
})
// 表格数据缓存
const tableData = ref([])

// 调用获取用户数据接口
const initGetUserList = async () => {
  const res = await getUsers(queryForm.value)
  console.log('【获取用户数据接口】', res)
  tableData.value = res.users // 将用户数据取出放入表格数据缓存
}
initGetUserList()
</script>

<style lang="scss" scoped>
.header {
  /* 搜索行与表格有一定间距 */
  padding-bottom: 16px;
}
</style>
