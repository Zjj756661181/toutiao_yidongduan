import Vue from 'vue'
import Router from 'vue-router'
import Tabber from '@/views/components/Tabber'
import Home from '@/views/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'Tabber',
      component: Tabber,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: '/User', // 我的  界面
          name: 'User',
          component: () => import(/* webpackChunkName: "User" */ '@/views/User.vue')
        }
      ]
    },
    {
      path: '/login', // 登录页
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login.vue')
    },
    {
      path: '/follow', // 关注/粉丝
      name: 'follow',
      component: () => import(/* webpackChunkName: "follow" */ '@/views/follow/index.vue')
    },
    {
      path: '/userProfile', // 个人信息页
      name: 'userProfile',
      component: () => import(/* webpackChunkName: "user-profile" */ '@/views/userProfile/index.vue')
    },
    {
      path: '/Search', // 搜索页
      name: 'Search',
      component: () => import(/* webpackChunkName: "search" */ '@/views/Search.vue')
    },
    {
      path: '/SearchResult', // 搜索结果页
      name: 'SearchResult',
      component: () => import(/* webpackChunkName: "searchResult" */ '@/views/SearchResult.vue')
    },
    {
      path: '/detail/:id', // 文章详情
      name: 'detail',
      // 路由跳转的时候对，对应的组件把动态路由参数，传递给组件
      props: true,
      component: () => import(/* webpackChunkName: "detail" */ '@/views/detail/index.vue')
    }
    // {
    //   path: '/login',
    //   name: 'login',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "login" */ '@/views/login.vue')
    // }
  ]
})
