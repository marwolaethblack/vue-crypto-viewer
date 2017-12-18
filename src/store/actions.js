import axios from 'axios';
import debounce from '../helpers/debouncer';
import router from '../router';

const delay = 250;


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





