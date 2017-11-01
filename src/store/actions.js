import axios from 'axios';

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

export const changeSelectedCoin = ({ commit, state }, payload) => {
  if(payload.coin != state.selectedCoin) {
    commit('selectCoin', payload.coin);
    //Load new coin history on selected coin change
    fetchCoinHistory({ commit }, payload);
  }
}

export const fetchCoinHistory = ({ commit }, payload) => {

  const { exchange, currency, coin } = payload;
  const type = payload.type || 'month';

  commit('loadItem', 'coinHistory');


  axios.get(`/api/coins/${coin}/history?type=${type}&e=${exchange}&currency=${currency}`)
    .then(result => {
      commit('setCoinHistory', result.data);
      commit('loadItemFinished', 'coinHistory');
    })
    .catch(error => {
      console.log(error);
      commit('loadItemFinished', 'coinHistory');
    })

}

export const changeCurrency = ({ commit }, payload) => {
    commit('setCurrency', payload);
    fetchTopCoins({ commit }, payload);
};
