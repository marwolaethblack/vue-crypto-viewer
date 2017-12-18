import axios from 'axios';
import debounce from '../../helpers/debouncer';



const delay = 250;


//Optional payload which is the coin symbol of the coin whose history you want to load
const fetchCoinHistory = ({ commit, state, rootState }) => {

  const { chartType } = state;
  const { selectedExchange } = rootState.exchange;
  const { selectedCurrency } = rootState.currency;
  const { selectedCoin } = rootState.popularCoins;

  commit('loadItem', 'coinHistory');


  axios.get(`/api/coins/${selectedCoin}/history?type=${chartType}&e=${selectedExchange}&currency=${selectedCurrency}`)
    .then(result => {
      commit('setCoinHistory', result.data);
      commit('loadItemFinished', 'coinHistory');
    })
    .catch(error => {
      console.log(error);
      commit('loadItemFinished', 'coinHistory');
    })

};

const changeChartType = debounce(

  ({ commit, state, dispatch }, payload) => {

    if(payload != state.chartType) {
      commit('setChartType', payload);

      //Reloads graph with new data
      if(payload.coinToLoad) {
        dispatch('fetchCoinHistory', payload.coinToLoad);
      } else {
        dispatch('fetchCoinHistory');
      }
    }

  }, delay);


const chartModule = {

  state: {
    //Cointains price history an volume history data
    coinHistory: {},
    chartType: 'month'

  },

  actions: {

    fetchCoinHistory,
    changeChartType

  },

  getters: {

    coinHistory(state) {
      return state.coinHistory;
    },

    chartType(state) {
      return state.chartType;
    }

  },

  mutations: {

    setChartType(state, payload) {
      state.chartType = payload;
    },

    setCoinHistory(state, payload) {
      state.coinHistory = payload;
    }

  }

};

export default chartModule;



