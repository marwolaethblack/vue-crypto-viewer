import axios from 'axios';
import debounce from '../../helpers/debouncer';



const delay = 250;

//Payload is the currency symbol e.g. "USD" "DKK"
const fetchTopCoins = debounce(

  ({ commit, state, rootState }) => {

      commit('loadItem', 'topCoins');
      const currency = rootState.currency.selectedCurrency;

      axios.get(`/api/coins/top?currency=${currency}`)
        .then(result => {
          commit('setTopCoins', result.data);
          commit('loadItemFinished', 'topCoins');
        })
        .catch(error => {
          console.log(error);
          commit('loadItemFinished', 'topCoins');
          
        });
  }, delay);



//Payload is the coins symbol e.g. "BTC"
const changeSelectedCoin = debounce(

  ({ commit, state, dispatch, rootActions }, payload) => {

    if(payload != state.selectedCoin) {
      commit('selectCoin', payload);
      //Load new coin history on selected coin change
      dispatch('fetchCoinHistory');
    }

  }, delay);

const popularCoinsModule = {

  state: {
    //Cointains price history an volume history data
    topCoins: {},
    selectedCoin: "BTC"
  },

  actions: {

    fetchTopCoins,
    changeSelectedCoin

  },

  getters: {

    topCoins(state) {
      return state.topCoins;
    },

    selectedCoin(state) {
      return state.selectedCoin;
    }

  },

  mutations: {

    setTopCoins(state, payload) {
      payload.forEach(coin => {
        coin.img = coin.symbol + ".webp";
      })

      state.topCoins = payload;
    },

    selectCoin(state , payload) {
      state.selectedCoin = payload;
    }

  }

};

export default popularCoinsModule;



