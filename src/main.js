import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

import VueParticles from 'vue-particles'
//使用全局变量global.js文件
import global_msg from './global.js'   //注意文件路径，实际路径以项目目录结构为准
import ins from './ins.js'
//引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.prototype.axios = axios;
Vue.use(VueAxios, axios);
Vue.prototype.$global_msg = global_msg;
Vue.prototype.ins = ins;
Vue.use(VueParticles);
Vue.use(ElementUI);


router.beforeEach((to, from, next) => {
  // 1.如果访问的是登录页面（无需权限），直接放行
  if (to.path === '/login') return next()
  // 2.如果访问的是有登录权限的页面，先要获取token
  const tokenStr = window.sessionStorage.getItem('password')
  console.log(tokenStr)
  // 2.1如果token为空，强制跳转到登录页面；否则，直接放行
  if (!tokenStr) return next('/login')
  next()
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
