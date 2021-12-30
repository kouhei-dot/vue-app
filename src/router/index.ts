import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Main from '../views/Main.vue'
import BitCoin from '@/components/BitCoin.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/top',
    component: Main,
  },
  {
    path: '/bitcoin',
    component: BitCoin,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/',
    component: Login,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
