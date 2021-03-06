<template>
  <div>
    <app-Loader v-if="isCoinDetailsLoading"></app-Loader>
    <div v-else>
      <app-ErrorPage v-if="!isCoinFound" :Message="coinDetails.Message"></app-ErrorPage>
      <app-CoinInfo v-else
                    :coinDetails="coinDetails"
                    :coin="coin"
                    :socketData="socketData"
                    :pricePercentChange="pricePercentChange"
      >
      </app-CoinInfo>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import CoinInfo from './CoinInfo.vue';
  import ErrorPage from '../ErrorPage.vue';
  import SocialStats from './SocialStats.vue';
  import Loader from '../Loader.vue';
  import io from 'socket.io-client';
  import parseWebSocketPriceData from '../../helpers/parseWebSocketPriceData';


  export default {

    data() {
      return {
        coin: "",
        socket: {},
        subscription: [],
        socketData: {},
        pricePercentChange: 0
      }
    },

    created() {
      this.coin = this.$route.params.coin;
      this.fetchCoinDetails(this.coin);
      
      //Changes coin name because of api differences
      this.coin = this.coin === 'BCC' ? "BCCOIN" : this.coin;
      this.coin = this.coin === 'MIOTA' ? 'IOT' : this.coin;
      this.changeSelectedCoin(this.coin);
      this.connectSocket();

    },

    destroyed() {
      this.disconnectSocket();
    },


    computed: {
      ...mapGetters(['coinDetails', 'loading']),

      isCoinDetailsLoading() {
        if(this.loading.length != 0) {
          return this.loading.indexOf('coinDetails') === -1 ? false : true;
        }
      },

      isCoinFound() {
        return this.coinDetails.Response === "Error" ? false : true;
      }


    },

    methods: {
      ...mapActions(['fetchCoinDetails', 'changeSelectedCoin']),

      connectSocket() {
        this.socket = io('wss://streamer.cryptocompare.com');
        this.subscription = [`5~CCCAGG~${this.coin}~USD`];
        this.socket.emit('SubAdd', { subs: this.subscription });
        this.socket.on("m", message => {
          const parsedData = parseWebSocketPriceData.CURRENT.unpack(message);
          const priceChange = ((parseFloat(parsedData.PRICE) - parseFloat(this.socketData.PRICE)) / this.socketData.PRICE) * 100;
          const percentChange = isNaN(parseFloat(priceChange).toFixed(5)) ? percentChange : parseFloat(priceChange).toFixed(5);
          this.pricePercentChange = percentChange ? percentChange : this.pricePercentChange;

          this.socketData = {...this.socketData, ...parsedData};
        });
      },

      disconnectSocket() {
        this.socket.emit('SubRemove', { subs: this.subscription } );
        this.socket.close();
      }

    },

    components: {
      'app-Loader': Loader,
      'app-CoinInfo': CoinInfo,
      'app-ErrorPage': ErrorPage,
      'app-SocialStats': SocialStats
    },

  }
</script>

