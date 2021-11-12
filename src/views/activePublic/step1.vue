<template>
  <!--基础设置页面-->
  <div class="main">
    <el-form
      ref="form"
      label-position="top"
      @submit.prevent="onSubmit"
      class="tou"
    >
      <el-row type="flex" class="row-bg">
        <el-col :span="3">
          <div class="zhengwen">
            推理引擎配置：
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="3">
          <div class="zhengwen">
            选择显卡ID：
          </div>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入内容"
            v-model="gpu"
            size="large"
            show-word-limit
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="3">
          <div class="zhengwen">
            置信度阈值：
          </div>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入内容"
            v-model="conf"
            size="large"
            show-word-limit
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg">
        <el-col :span="3">
          <div class="zhengwen">
            交并比阈值：
          </div>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="请输入内容"
            v-model="iou"
            size="large"
            show-word-limit
          >
          </el-input>
        </el-col>
      </el-row>

      <el-row type="flex" class="row-bg">
        <el-col :span="3">
          <div class="zhengwen">
            告警平台信息：
          </div>
        </el-col>
        <el-col :span="6" class="col1">
          <el-cascader
            placeholder="试试搜索：东盟信息港"
            value="{xuan}"
            :options="options"
            :props="{ multiple: true }"
            filterable
            @change="handleChange"
          ></el-cascader></el-col
        ><el-col :span="3">
          <el-button type="primary" @click="tianjia"
            >添加告警平台</el-button
          ></el-col
        >
      </el-row>
      <div v-show="show">
        <el-row type="flex" class="row-bg">
          <el-col :span="3">
            <div class="zhengwen">
              名字：
            </div>
          </el-col>
          <el-col :span="6">
            <el-input
              placeholder="请输入内容"
              v-model="x1"
              size="large"
              show-word-limit
              :disabled="true"
            >
            </el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="3">
            <div class="zhengwen">
              平台地址：
            </div>
          </el-col>
          <el-col :span="6">
            <el-input
              placeholder="请输入内容"
              v-model="x2"
              size="large"
              show-word-limit
            >
            </el-input>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <el-button type="primary" @click="tijiao">保存</el-button>
  </div>
</template>

<script>
export default {
  name: 'step1',
  data: () => {
    return {
      x1: 'caih',
      x2: '',
      gpu: '0',
      conf: '0.5',
      iou: '0.45',
      reports: '',
      show: false,
      options: [
        {
          value: 'caih',
          label: '东盟信息港',
        },
      ],
      select: '',
    }
  },
  created: function() {
    this.initialize1()
  },
  methods: {
    tianjia() {
      var list = new Array()
      list = this.select
      for (var i = 0; i < list.length; i++) {
        if (list[i].value == 'caih') {
          this.show = 'true'
        }
      }
    },
    handleChange(value) {
      console.log(value)
      var list = new Array()
      for (var i = 0; i < value.length; i++) {
        var a = { value: value[i][0] }
        list.push(a)
      }
      this.select = list
      console.log(this.select)
    },

    initialize() {
      console.log('开始页面初始化')
      var list = this.$global_msg.ruleform.reports
      var list1 = new Array()
      console.log(list)
      for (var i = 0; i < list.length; i++) {
        if (list[i].name == 'caih') {
          var a = { value: list[i].name }
          list1.push(a)
          this.show = 'true'
          this.x1 = 'caih'
          this.x2 = list[i].parameters.base_url
        }
      }
      this.select = list1
      console.log(this.select)
      this.gpu = this.$global_msg.ruleform.infer.gpu
      this.conf = this.$global_msg.ruleform.infer.conf
      this.fou = this.$global_msg.ruleform.infer.fou
      this.reports = this.$global_msg.ruleform.reports
    },
    tijiao() {
      var list = new Array()
      list = this.select
      var list1 = new Array()
      for (var i = 0; i < list.length; i++) {
        if (list[i].value == 'caih') {
          var parameters = {
            base_url: this.x2,
          }
          var a = {
            name: 'caih',
            parameters,
          }
        }
        list1.push(a)
      }
      this.reports = list1
      this.$global_msg.ruleform.infer.gpu = this.gpu
      this.$global_msg.ruleform.infer.conf = this.conf
      this.$global_msg.ruleform.infer.fou = this.fou
      this.$global_msg.ruleform.reports = this.reports
      console.log(this.$global_msg.ruleform.infer.gpu)
      console.log(this.$global_msg.ruleform.infer.conf)
      console.log(this.$global_msg.ruleform.infer.fou)
      console.log(this.$global_msg.ruleform.reports)
      this.$notify({
        title: '成功',
        message: '保存成功',
        type: 'success',
      })
    },
  },
}
</script>

<style scoped>
.col1 {
  margin-left: 10px;
}
.main {
  margin-block: 20px;
}
.tou {
  margin-top: 20px;
}

.row-bg {
  margin: 0px 0px 22px;
}
.row-bg1 {
  padding: 0px 0px 10px;
  height: 40px;
}
.zhengwen {
  font: 14px 'Helvetica Neue';
  color: #606266;
}
</style>
