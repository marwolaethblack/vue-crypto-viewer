import axios from 'axios';

export const fetchTopCoins = ({ commit, state }) => {

    commit('loadItem', 'topCoins');

    axios.get('/api/coins/top')
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
  if(payload != state.selectedCoin) {
    commit('selectCoin', payload);
    //Load new coin history on selected coin change
    fetchCoinHistory({ commit }, payload);
  }
}

export const fetchCoinHistory = ({ commit }, payload) => {

  commit('loadItem', 'coinHistory');

  axios.get(`/api/coins/${payload}/history`)
    .then(result => {
      commit('setCoinHistory', result.data);
      commit('loadItemFinished', 'coinHistory');
    })
    .catch(error => {
      console.log(error);
      commit('loadItemFinished', 'coinHistory');
    })

}
