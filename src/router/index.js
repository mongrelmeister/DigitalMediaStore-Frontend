import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/artists',
    name: 'Artists',
    component: () => import(/* webpackChunkName: "artists" */ '@/views/Artists.vue')
  },
  {
    path: '/albums',
    name: 'Albums',
    component: () => import(/* webpackChunkName: "albums" */ '@/views/Albums.vue')
  },
  {
    path: '/tracks',
    name: 'Tracks',
    component: () => import(/* webpackChunkName: "albums" */ '@/views/Tracks.vue')
  },
  {
    path: '/genres',
    name: 'Genres',
    component: () => import(/* webpackChunkName: "albums" */ '@/views/Genres.vue')
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
