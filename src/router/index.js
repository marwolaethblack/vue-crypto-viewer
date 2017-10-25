import Vue from 'vue'
import Router from 'vue-router'
import TopCoins from '@/components/TopCoins'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TopCoins',
      component: TopCoins
    }
  ]
})
