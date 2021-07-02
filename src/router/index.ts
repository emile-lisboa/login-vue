import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    children: [
      {
        path: '',
        component: ()=> import (/* webpackChunkName: "LoginForm" */'../components/LoginForm.vue')
      },
      {
        path: 'signup',
        component: ()=> import (/* webpackChunkName: "SignUpForm" */'../components/SignUpForm.vue')
      }
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: ()=> import (/* webpackChunkName: "Home" */'../views/Home.vue')
  },
  {
    path: '/?*',
    redirect:'/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
