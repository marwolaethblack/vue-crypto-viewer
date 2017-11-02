import Vue from 'vue';
import Vuex from 'vuex';
import * as mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

const state = {
  topCoins: [],
  currency: "USD",
  selectedCoin: "BTC",
  exchange: "CCCAGG",
  loading: [],
  coinHistory: {},
  chartType: 'month'
};

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters
});

export default store;
