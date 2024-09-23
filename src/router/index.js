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
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/channel',
      children: [
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleMange.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    },
    {
      path: '/article/manage',
      component: () => import('@/views/layout/LayoutContainer.vue')
    }
  ]
})
//登录访问拦截 =>默认是直接放行
//根据返回值决定,是放行还是拦截
//返回值:
//1.undefined / true 直接放行
//2.false 栏回from的地址页面
//3.具体路径或路径对象 拦截到对应的地址
// '/login'

//登录访问拦截
router.beforeEach((to) => {
  const userStore = userUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
})

// // eslint-disable-next-line no-undef
export default router
