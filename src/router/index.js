import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/dashboard/DashboardPage.vue'
const CoinDetails = () =>  import('@/components/coinDetails/CoinDetailsPage.vue')
const AllCoins = () => import('@/components/allCoins/AllCoinsPage.vue')
const ErrorPage = () => import('@/components/ErrorPage.vue')

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      alias: '/index.html'
    },
    {
      name: 'CoinDetails',
      path: '/coins/:coin/details',
      component: CoinDetails
    },
    {
      name: 'AllCoins',
      path: '/coins/all',
      component: AllCoins
    },
    {
      name: 'NotFound',
      path: '*',
      component: ErrorPage,
      props: { Message: "Sorry. 404 Page not found. Try going back to the dashboard" }
    }
  ]
})
