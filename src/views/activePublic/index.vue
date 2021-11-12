<template>
  <div class="activePublic ">
    <el-steps :space="200" :active="step" class="step">
      <el-step title="基本设置" description=""></el-step>
      <el-step title="摄像头系统设置" description=""></el-step>
    </el-steps>

    <transition name="fade">
      <router-view class="view"></router-view>
    </transition>

    <div class="but-group">
      <el-button @click.native.prevent="handlePreview" v-show="preview"
        >预览</el-button
      >
      <el-button @click.native.prevent="handlePreStep" v-show="preStep"
        >上一步</el-button
      >
      <el-button
        @click.native.prevent="handleNextStep"
        v-show="nextStep"
        type="primary"
        >下一步</el-button
      >
      <el-button
        @click.native.prevent="handlePublish"
        v-show="publish"
        type="primary"
        >完成设置，并提交</el-button
      >
      <el-button @click.native.prevent="chongzhi" type="primary"
        >重置所有配置</el-button
      >
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'activePublic',
  data: function() {
    return {
      isRouter: false,
      preview: false,
      preStep: false,
      nextStep: true,
      publish: false,
      step: 1,
    }
  },
  methods: {
    handlePreview: function() {
      console.log('预览')
    },
    handlePreStep: function() {
      this.$router.go(-1)
      this.step--
      this.goStep(this.step)
      $('html,body').animate({ scrollTop: 0 }, 500)
    },
    handleNextStep: function() {
      this.$router.push('/activePublic/step' + (this.step + 1))
      var _this = this
      setTimeout(function() {
        if (_this.isRouter) {
          _this.step++
          _this.goStep(_this.step)
        }
      })
      $('html,body').animate({ scrollTop: 0 }, 500)
    },
    handlePublish: function() {
      console.log('完成设置并提交')
      var axios = require('axios')
      var data = this.$global_msg.ruleform
      console.log(data)
      var config = {
        method: 'post',
        url: this.$global_msg.myurl + '/api/config',
        headers: {
          'X-Auth-Token': window.sessionStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        data: data,
      }

      axios(config)
        .then((res) => {
          console.log(res)
          if (res.data.status_code == 0) {
            this.$notify({
              title: '成功',
              message: '修改配置成功',
              type: 'success',
            })
          }
          if (res.data.status_code == -1) {
            this.$notify.error({
              title: '错误',
              message: '修改失败，token错误，请重新登录',
              duration: 0,
            })
            window.localStorage.removeItem('token')
          }
        })
        .catch((error) => {
          console.log(error)
          this.$notify.error({
            title: '错误',
            message: '网络异常',
          })
        })
    },
    chongzhi() {
      var axios = require('axios')
      var qs = require('qs')
      var data = qs.stringify({})
      var config = {
        method: 'delete',
        url: this.$global_msg.myurl + '/api/config',
        headers: {
          'X-Auth-Token': sessionStorage.getItem('token'),
        },
        data: data,
      }
      axios(config)
        .then((res) => {
          console.log(res)
          if (res.data.status_code == 0) {
            this.$notify({
              title: '成功',
              message: '重置配置成功',
              type: 'success',
            })
            location.reload()
          }
          if (res.data.status_code == -1) {
            this.$notify.error({
              title: '错误',
              message: '修改失败，token错误，请重新登录',
              duration: 0,
            })
            window.localStorage.removeItem('token')
          }
        })
        .catch((res) => {
          console.log(res)
          this.$notify.error({
            title: '错误',
            message: '网络异常',
          })
        })
    },
    goStep: function(n) {
      switch (n) {
        case 1:
          this.preview = false
          this.preStep = false
          this.nextStep = true
          this.publish = false
          break
        case 2:
          this.preview = false
          this.preStep = true
          this.nextStep = false
          this.publish = true
          break
      }
    },
  },
  watch: {
    $route: function(to, from) {
      this.isRouter = true
    },
  },
}
</script>
<style>
.col1 {
  margin-left: 10px;
}
.el-col {
  border-radius: 4px;
}
.row-bg {
  margin: 0px 0px 22px;
}
.activePublic .router-link {
  color: #fff;
}
.activePublic .but-group .el-button {
  margin-right: 20px;
}
</style>
