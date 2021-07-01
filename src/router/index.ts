import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login
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
