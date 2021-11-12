<template>
  <div>
    <div style="margin-bottom: 20px;">
      <el-button size="small" @click="click_addcamera()">
        添加新摄像头
      </el-button>
    </div>
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      closable
      @tab-remove="removeTab_main()"
      @tab-click="choosetab"
    >
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.name"
        :label="item.name"
        :name="item.name"
        :lazy="true"
      >
        <h3>{{ item.name + ' content' }}</h3>
        <Tabspage />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Tabspage from './tabspage.vue'
export default {
  name: 'step2',
  data() {
    return {
      editableTabsValue: '#!#@3$5',
      editableTabs: [],
      NavigateItem: [],
    }
  },
  created: function() {
    //先赋初值
    this.initialize()
  },
  methods: {
    choosetab(tab) {
      var activeName = this.editableTabsValue
      console.log(activeName)
      console.log('选中标签：' + activeName)
      this.$global_msg.tab = activeName
    },
    synchronization() {
      this.$global_msg.ruleform.channels = this.editableTabs
    },
    initialize() {
      this.editableTabs = this.$global_msg.ruleform.channels
      console.log(this.editableTabs)
    },
    removeTab_main(value) {
      console.log('删除摄像头事件触发')
      this.$confirm('此操作将永久删除该摄像头, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.removeTab(this.editableTabsValue)
          //👇将修改同步到全局配置中
          console.log(this.editableTabs)
          this.synchronization()
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
          return
        })
    },
    removeTab(targetName) {
      let tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName)
    },
    click_addcamera() {
      console.log('添加新摄像头')
      //添加新摄像头时加名称
      this.$prompt('请输入摄像头名称: ', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        inputValidator(value) {
          if (value == undefined) {
            return '分组名不能为空'
          } else if (value.length == 0) {
            return '分组名不能为空'
          } else if (!value.match('^[a-zA-Z0-9_\u4e00-\u9fa5]+$')) {
            return '不支持特殊字符'
          } else if (value.length > 20) {
            return '请输入20个字符以内的分组名称'
          }
        },
        inputErrorMessage: '不支持特殊字符',
      })
        .then(({ value }) => {
          console.log('添加成功!!!')
          let newTabName = ++this.tabIndex + ''
          this.editableTabs.push({
            name: value,
          })
          this.editableTabsValue = newTabName
          //👇将修改同步到全局配置中
          this.synchronization()
          this.$notify({
            title: '成功',
            message: '添加摄像头成功',
            type: 'success',
          })
          //刷新页面
          this.$router.replace({
            path: '/activePublic/step2',
            name: 'step2',
          })
        })
        .catch(() => {
          console.log('取消添加')
          this.$notify.error({
            title: '错误',
            message: '添加已取消',
          })
        })
    },
  },
  components: {
    Tabspage,
  },
}
</script>

<style scoped>
li {
  list-style: none;
}
.demonstration {
  margin: 20px 0;
  width: 217px;
  text-align: center;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.block {
  margin: 20px 0;
}
.aside1 {
  border-right: 1px solid #303133;
}
.el1 {
  width: 200px;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.button {
  width: 30px;
}
</style>
