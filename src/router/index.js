import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/dashboard/Dashboard.vue'
const CoinDetails = () =>  import('@/components/CoinDetails.vue')
const AllCoins = () => import('@/components/allCoins/AllCoins.vue')

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
