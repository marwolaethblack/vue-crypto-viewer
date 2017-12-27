import Vue from 'vue';
import Vuex from 'vuex';
import * as mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';
import exchangeModule from './modules/exchangeModule';
import currencyModule from './modules/currencyModule';
import chartModule from './modules/chartModule';
import coinInfoModule from './modules/coinInfoModule';
import popularCoinsModule from './modules/popularCoinsModule';


Vue.use(Vuex);

const state = {
  loading: [],
  allCoins: {}
};

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,

  modules: {
    exchange: exchangeModule,
    currency: currencyModule,
    chart: chartModule,
    coinInfo: coinInfoModule,
    popularCoins: popularCoinsModule
  }
});

export default store;
