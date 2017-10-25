import axios from 'axios';

export const fetchTopCoins = ({ commit, state }) => {

    axios.get('/api/coins/top')
      .then(result => {
        commit('setTopCoins', result.data);
      })
      .catch(error => {
        console.log(error);
      });
}
