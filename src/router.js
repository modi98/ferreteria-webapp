import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import CreateClient from './views/CreateClient.vue'
import ReportClients from './views/ReportClients.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/createClient',
      name: 'createClient',
      component: CreateClient
    },
    {
      path: '/reportClients',
      name: 'reportClients',
      component: ReportClients
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
