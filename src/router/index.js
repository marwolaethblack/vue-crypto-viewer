import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/dashboard/Dashboard.vue';
import CoinDetails from '@/components/CoinDetails.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/:coin',
      component: CoinDetails
    }
  ]
})
