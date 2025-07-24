<template>
  <div class="allActive">
    <el-card class="box-card">
      <h3>日志列表</h3>
      <el-button type="primary" @click="refreshLogs" size="small" style="margin-bottom: 10px;">
        刷新日志
      </el-button>
      <el-table
        :data="logs"
        style="width: 100%"
        @row-click="handleRowClick"
        highlight-current-row
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="message" label="日志内容" />
        <el-table-column prop="timestamp" label="时间" width="180" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'LogList',
  data() {
    return {
      logs: [
        { id: 1, message: '系统启动成功', timestamp: '2025-07-24 10:00:00' },
        { id: 2, message: '用户登录', timestamp: '2025-07-24 10:05:23' },
        { id: 3, message: '新增摄像头配置', timestamp: '2025-07-24 10:12:45' },
      ],
    }
  },
  methods: {
    handleRowClick(row) {
      // 点击行事件，打印日志信息，后续可改为弹窗等
      this.$message.info(`点击日志ID: ${row.id}, 内容: ${row.message}`)
      console.log('日志详情：', row)
    },
    refreshLogs() {
      // 模拟刷新，实际可调用接口
      this.$message.success('日志列表已刷新')
      // 这里简单模拟追加一条新日志
      const newId = this.logs.length + 1
      this.logs.push({
        id: newId,
        message: `模拟新增日志 ${newId}`,
        timestamp: new Date().toLocaleString(),
      })
    },
  },
}
</script>

<style>
.allActive .head {
  text-align: center;
  color: #fff;
  font-size: 30px;
  margin-bottom: 50px;
}

.allActive .head span {
  font-size: 16px;
}
</style>
