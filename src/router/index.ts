import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "LoginForm" */ '../components/LoginForm.vue'),
        meta: { requiresAuth: false }
      },
      {
        path: 'signup',
        component: () => import(/* webpackChunkName: "SignUpForm" */ '../components/SignUpForm.vue'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/?*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const user = await firebase.auth().currentUser
    if (!user) next({ path: '/' })
    else next()
  } else {
    next()
  }
})

export default router
