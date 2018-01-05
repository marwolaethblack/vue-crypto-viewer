import axios from 'axios';
import debounce from '../../helpers/debouncer';


const delay = 250;


//Payload is the currency symbol e.g "DKK" "USD"
const changeCurrency = debounce(

  ({ commit, state, dispatch }, payload) => {

    if(payload != state.currency) {
      commit('setCurrency', payload);

      //Reloads top coins with new currency
      dispatch('fetchTopCoins');

      //Reloads coin price graphs with new currency
      dispatch('fetchCoinHistory');
    }

  }, delay);

const currencyModule = {

  state: {

    selectedCurrency: "USD",

  },

  actions: {

    changeCurrency

  },

  getters: {

    currency(state) {
      return state.selectedCurrency;
    }

  },

  mutations: {

    setCurrency(state, payload) {
      state.selectedCurrency = payload;
    }

  }

};

export default currencyModule



