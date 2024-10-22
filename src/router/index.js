import userUserStore from '/src/stores/user.js'
import { createRouter, createWebHistory } from 'vue-router'

//createRouter
//配置history 模式
// 1.history模式: createWebHistory 地址栏不带 #
// 2.hash模式:     createWebHasHistory 地址栏带 #

//console.log(import.meta.env.DEV)
//vite 中的环境变量 import.meta.env.BASE_URL

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', component: () => import('@/views/login/LoginPage.vue') }, //登录页
    {
      path: '/',
      component: () => import('@/views/layout/Navbar.vue'),
      redirect: '/login',
      children: [
        {
          path: '/consortium',
          component: () => import('@/views/consortium.vue')
        },
        {
          path: '/characters',
          component: () => import('@/views/characters.vue')
        }
      ]
    }
  ]
})

export default router
