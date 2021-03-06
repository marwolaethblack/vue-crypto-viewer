import axios from 'axios';
import debounce from '../../helpers/debouncer';


const delay = 250;

//Required payload which is the coin symbol e g "BTC"
const fetchCoinDetails = ({ commit, state }, payload) => {


  //Only load data if
  // a) the coinDetails property is empty so no coin has been loaded yet
  // b) the previous response was an error
  // c) the coin to be fetched is not the same as the one currently loaded
  const areCoinDetailsEmpty = !Object.keys(state.coinDetails).length;
  const isError = state.coinDetails.Response === "Error";

  if(areCoinDetailsEmpty || isError || state.coinDetails.Data.General.Symbol !== payload) {
    commit('loadItem', 'coinDetails');

    axios.get(`/api/coins/${payload}/details`)
      .then(response => {
        commit('setCoinDetails', response.data);
        commit('loadItemFinished', 'coinDetails');
      })
      .catch(error => {
        commit('setCoinDetails', error.response.data);
        commit('loadItemFinished', 'coinDetails');
      });
  }


};

//Required payload which is the coin symbol e g "BTC"
const fetchCoinSocialStats = ({ commit, state }, payload) => {


  //Only load data if
  // a) the socialStats property is empty so no coin has been loaded yet
  // b) the previous response was an error
  // c) the coin to be fetched is not the same as the one currently loaded
  const areCoinDetailsEmpty = !Object.keys(state.coinSocialStats).length;
  const isError = state.coinSocialStats.Response === "Error";

  if(areCoinDetailsEmpty || isError || state.coinSocialStats.Data.General.Name !== payload) {
    commit('loadItem', 'coinSocialStats');

    axios.get(`/api/coins/${payload}/social`)
      .then(response => {
        commit('setCoinSocialStats', response.data);
        commit('loadItemFinished', 'coinSocialStats');
      })
      .catch(error => {
        commit('setCoinSocialStats', error.response.data);
        commit('loadItemFinished', 'coinSocialStats');
      });
  }


};

const coinInfoModule = {

  state: {

    coinDetails: {},
    coinSocialStats: {}

  },

  actions: {

    fetchCoinDetails,
    fetchCoinSocialStats

  },

  getters: {

    coinDetails(state){
      return state.coinDetails;
    },

    coinSocialStats(state) {
      return state.coinSocialStats;
    }

  },

  mutations: {

    setCoinDetails(state, payload) {
      state.coinDetails = payload;
    },

    setCoinSocialStats(state, payload) {
      state.coinSocialStats = payload;
    }

  }

};

export default coinInfoModule;



