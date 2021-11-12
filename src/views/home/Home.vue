<template>
  <div id="app">
    <!-- 头部导航 -->
    <header class="header" :class="{ 'header-fixed': headerFixed }">
      <el-row>
        <el-col :span="16">
          <el-menu
            default-active="5"
            class="el-menu-demo"
            mode="horizontal"
            :router="true"
          >
            <el-menu-item style=" border-bottom: none;" index="/activePublic"
              ><el-image
                style=" height: 40px"
                :src="require('../../../image/anview-black.png')"
              ></el-image>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </header>
    <div
      v-show="headerFixed"
      style="position: relative; height: 60px; width: 100%"
    ></div>

    <main>
      <!-- 左侧导航 -->
      <div class="main-left">
        <el-menu
          default-active="/activePublic"
          class="el-menu-vertical-demo"
          :router="true"
        >
          <el-menu-item index="/activePublic">系统配置</el-menu-item>
          <el-menu-item index="/activeManage">事件列表</el-menu-item>
          <el-menu-item index="/log">日志</el-menu-item>
        </el-menu>
      </div>

      <!-- 右侧主内容区 -->
      <div class="main-right">
        <transition name="fade">
          <router-view class="view"></router-view>
        </transition>
      </div>
    </main>
    <Foot />
  </div>
</template>

<script>
import Foot from '../../components/footer.vue'
import $ from 'jquery'

export default {
  name: 'Home',
  components: {
    Foot,
  },
  data: function() {
    return {
      active: true,
      headerFixed: true,
    }
  },
  created: function() {
    this.$router.push('/activePublic')
    this.check()
  },

  methods: {
    logout() {
      this.$router.push('/login')
    },

    check: function() {
      var axios = require('axios')
      var FormData = require('form-data')
      var data = new FormData()
      var config = {
        method: 'post',
        url: this.$global_msg.myurl + '/api/token',
        headers: {
          'X-Auth-Token': window.sessionStorage.getItem('token'),
        },
        data: data,
      }
    },
  },
  watch: {
    $route: function(to, from) {
      if (to.path == '/activePublic') {
        this.active = true
      } else if (to.path == '/activeManage') {
        this.active = false
      }
    },
  },
}
</script>

<style>
body {
  margin: 0;
}
#app {
  min-width: 1200px;
  margin: 0 auto;
  font-family: 'Helvetica Neue', 'PingFang SC', Arial, sans-serif;
}
/* 头部导航 */
header {
  z-index: 1000;
  min-width: 1200px;
  transition: all 0.5s ease;
  border-top: solid 4px #3091f2;
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
header.header-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
header .el-menu-demo {
  padding-left: 200px !important;
}

/* 主内容区 */
main {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  min-height: 800px;
  border: solid 40px #e9ecf1;
  background-color: #fcfcfc;
}
main .main-left {
  text-align: center;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 200px;
  flex: 0 0 200px;
}
main .main-right {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  background-color: #fff;
  padding: 50px 70px;
}
main .el-menu {
  background-color: transparent !important;
}
/*  */
.router-link {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: center;
  color: #475669;
  text-decoration: none;
}
.is-active .router-link {
  color: #20a0ff;
}

/* 单选框 */
.el-form-item .el-radio + .el-radio {
  margin-left: 30px !important;
}
/* 路由切换动效 */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-active {
  opacity: 0;
  transform: translateY(30px);
}

/* 导航栏菜单选中效果 */
.isActive {
  color: #20a0ff !important;
}
#app main .aside .is-active {
  color: #475669;
}

/* 卡片 */
.el-card {
  overflow: visible !important;
}
</style>
