import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/dashboard/DashboardPage.vue'
const CoinDetails = () =>  import('@/components/coinDetails/CoinDetailsPage.vue')
const AllCoins = () => import('@/components/allCoins/AllCoinsPage.vue')

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
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
    }
  ]
})
