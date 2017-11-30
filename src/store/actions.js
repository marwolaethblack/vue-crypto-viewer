import axios from 'axios';
import debounce from '../helpers/debouncer';
import throttle from '../helpers/debouncer';

const delay = 250;

//Payload is the currency symbol e.g. "USD" "DKK"
export const fetchTopCoins = debounce(

  ({ commit, state }, payload) => {

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

}, delay);



//Payload is the coins symbol e.g. "BTC"
export const changeSelectedCoin = debounce(

  ({ commit, state }, payload) => {

    if(payload != state.selectedCoin) {
      commit('selectCoin', payload);
      //Load new coin history on selected coin change
      fetchCoinHistory({ commit, state });
    }

}, delay);




//Optional payload which is the coin symbol of the coin whose history you want to load
export const fetchCoinHistory = ({ commit, state }) => {

    const { exchange, currency, chartType, selectedCoin } = state;

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

};


//Payload is the currency symbol e.g "DKK" "USD"
export const changeCurrency = debounce(

  ({ commit, state }, payload) => {

    if(payload != state.currency) {
      commit('setCurrency', payload);

      //Reloads top coins with new currency
      fetchTopCoins({ commit }, payload);

      //Reloads coin price graphs with new currency
      fetchCoinHistory({ commit, state });
    }

}, delay);


export const changeChartType = debounce(

  ({ commit, state }, payload) => {

    if(payload != state.chartType) {
      commit('setChartType', payload);

      //Reloads graph with new data
      if(payload.coinToLoad) {
        fetchCoinHistory({ commit, state }, payload.coinToLoad);
      } else {
        fetchCoinHistory({ commit, state });
      }
  }

}, delay);



//Required payload which is the exchange symbol e.g "CCCAGG"
export const changeExchange = debounce(

  ({ commit, state }, payload) => {

    if(payload != state.exchange) {
      commit('setExchange', payload);

      //Reloads graph with new data
      fetchCoinHistory({ commit, state });
    }

}, delay);



//Required payload which is the coin symbol e g "BTC"
export const fetchCoinDetails = ({ commit, state }, payload) => {


    const areCoinDetailsEmpty = !Object.keys(state.coinDetails).length;

    if(areCoinDetailsEmpty || state.coinDetails.Data.General.Symbol != payload) {
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
    }


};


export const fetchAllCoins = debounce(

  ({ commit }, payload) => {

    commit('loadItem', 'allCoins');

    axios.get('/api/coins/all')
      .then(response => {
        commit('setAllCoins', response.data);
        commit('loadItemFinished', 'allCoins');
      })
      .catch(error => {
        console.log(error);
        commit('loadItemFinished', 'allCoins');
      })

}, delay);





