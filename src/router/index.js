import Vue from 'vue'
import VueRouter from 'vue-router'
import GtLogin from '../GtLogin.vue'
import GtMain from '../GtMain.vue'
import LikesSummary from '../views/LikesSummary.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'gtLogin',
    component: GtLogin
  },
  {
    path: '/main',
    name: 'main',
    redirect: '/main/likesSummary',
    component: GtMain,
    // sub-routers
    children: [
      {
        path: 'likesSummary',
        name: 'likesSummary',
        component: LikesSummary

      },
      {
        path: 'likesMonitor',
        name: 'likesMonitor',
        // which is lazy-loaded when the route is visited.
        component: function () {
          return import('../views/LikesMonitor.vue')
        }
      },
      {
        path: 'newCamp',
        name: 'newCamp',
        // which is lazy-loaded when the route is visited.
        component: function () {
          return import('../views/NewCamp.vue')
        }
      },
      {
        path: 'ipLib',
        name: 'ipLib',
        // which is lazy-loaded when the route is visited.
        component: function () {
          return import('../views/IpLib.vue')
        }
      },
      {
        path: '*',
        redirect: 'likesSummary'
      }
    ]
  },
  {
    path: '*',
    redirect: 'main'
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   }
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
