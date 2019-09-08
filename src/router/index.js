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
        }
      ]
    },
    {
      path: '/Search',
      name: 'Search',
      component: () => import(/* webpackChunkName: "search" */ '@/views/Search.vue')
    },
    {
      path: '/SearchResult',
      name: 'SearchResult',
      component: () => import(/* webpackChunkName: "searchResult" */ '@/views/SearchResult.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login.vue')
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
