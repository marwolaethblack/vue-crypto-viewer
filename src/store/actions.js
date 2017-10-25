import axios from 'axios';

export const fetchTopCoins = ({ commit, state }) => {

    axios.get('/api/coins/top')
      .then(result => {
        commit('setTopCoins', result.data);
      })
      .then(error => {
        console.log(error);
      });
}
