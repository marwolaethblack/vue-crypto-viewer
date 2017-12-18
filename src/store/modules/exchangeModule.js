import axios from 'axios';
import debounce from '../../helpers/debouncer';


const delay = 250;

//Required payload which is the exchange symbol e.g "CCCAGG"
const changeExchange = debounce(

  ({ commit, state, dispatch }, payload) => {

    if(payload != state.exchange) {
      commit('setExchange', payload);

      //Reloads graph with new data
      dispatch('fetchCoinHistory');
    }

  }, delay);


const exchangeModule = {

  state: {

    selectedExchange: "CCCAGG",

  },

  actions: {

    changeExchange

  },

  getters: {

    exchange(state) {
      return state.selectedExchange;
    }

  },

  mutations: {

    setExchange(state, payload) {
      state.selectedExchange = payload;
    }

  }

};

export default exchangeModule



