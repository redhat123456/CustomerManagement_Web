import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'
import Login from '../views/login/Login.vue'
import activePublic from '../views/activePublic/index.vue'
import step1 from '../views/activePublic/step1.vue'
import step2 from '../views/activePublic/step2.vue'

import activeManage from '../views/activeManage/index.vue'
import page1 from '../views/activeManage/page1.vue'



import log from '../views/log/index.vue'

Vue.use(VueRouter)


const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children:[
      {
      path:'/activePublic',name: 'activePublic',component:activePublic,
      children:[
        { path: '/'      , name:'step1', component: step1  },
        { path: '/step1',  name:'step1', component: step1  },
        { path: 'step2', name:'step2', component: step2, }
      ]
    },{
      path: '/activeManage',component:activeManage,
    children:[
      { path: ''      , component: page1  },
      { path: 'page1', component: page1  }
    ]
    },{
      path:'/log',
      component:log
    }
    ]
  },
  
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Login
  }
]



const router = new VueRouter({
  routes: routes,
 // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
