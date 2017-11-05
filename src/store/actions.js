import axios from 'axios';
import {selectedCoin} from "./getters";

//Payload is the currency symbol e.g. "USD" "DKK"
export const fetchTopCoins = ({ commit, state }, payload) => {

    commit('loadItem', 'topCoins');
    const currency = payload || 'USD';

    axios.get(`/api/coins/top?currency=${currency}`)
      .then(result => {
        commit('setTopCoins', result.data);
        commit('loadItemFinished', 'topCoins');
      })
      .catch(error => {
        console.log(error);
        commit('loadItemFinished', 'topCoins');
      });

}

//Payload is the coins symbol e.g. "BTC"
export const changeSelectedCoin = ({ commit, state }, payload) => {
  if(payload != state.selectedCoin) {
    commit('selectCoin', payload);
    //Load new coin history on selected coin change
    fetchCoinHistory({ commit, state });
  }
}



export const fetchCoinHistory = ({ commit, state }) => {

  const { exchange, currency, selectedCoin, chartType } = state;

  commit('loadItem', 'coinHistory');


  axios.get(`/api/coins/${selectedCoin}/history?type=${chartType}&e=${exchange}&currency=${currency}`)
    .then(result => {
        commit('setCoinHistory', result.data);
        commit('loadItemFinished', 'coinHistory');
    })
    .catch(error => {
      console.log(error);
      commit('loadItemFinished', 'coinHistory');
    })

}

//Payload is the currency symbol e.g "DKK" "USD"
export const changeCurrency = ({ commit, state }, payload) => {
    commit('setCurrency', payload);

    //Reloads top coins with new currency
    fetchTopCoins({ commit }, payload);

    //Reloads coin price graphs with new currency
    fetchCoinHistory({ commit, state });

};

export const changeChartType = ({ commit, state }, payload) => {
  commit('setChartType', payload);

  //Reloads graph with new data
  fetchCoinHistory({ commit, state });
};

export const changeExchange = ({ commit, state }, payload) => {
  commit('setExchange', payload);

  //Reloads graph with new data
  fetchCoinHistory({ commit, state });
};

export const changeCoinDetails = ({ commit }, payload) => {
  commit('loadItem', 'coinDetails');

  axios.get(`/api/coins/${payload}/details`)
    .then(response => {
      commit('setCoinDetails', response.data);
      commit('loadItemFinished', 'coinDetails');
    })
    .catch(error => {
      console.log(error);
      commit('loadItemFinished', 'coinDetails');
    });

};



