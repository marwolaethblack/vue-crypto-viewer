// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex';
import App from './App'
import router from './router'
import store from './store/'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,

  created() {
    //Load initial state from server
    this.$store.dispatch('fetchTopCoins');
    this.$store.dispatch('fetchCoinHistory');
  },

  render: h => h(App)
})
