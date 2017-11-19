<template>
  <div >
    <app-Loader v-if="isCoinDetailsLoading"></app-Loader>
    <div v-else>
      <section class="section">
        <div class="container">
          <img :src="`/static/img/coins/${coin}.png`">
          <h1 class="title is-1">{{ coinDataGeneral.H1Text }}</h1>
          <a v-show="hasLink(coinDataGeneral.AffiliateUrl)" :href="coinDataGeneral.AffiliateUrl" target="_blank">Website</a>
          <a v-show="hasLink(coinDataIco.BlogLink)" :href="coinDataIco.BlogLink" target="_blank">Blog</a>
          <a v-show="hasLink(coinDataIco.WhitePaperLink)" :href="coinDataIco.WhitePaperLink" target="_blank">WhitePaper</a>
          <a v-show="hasLink(coinDataGeneral.Twitter)" :href="`https://twitter.com/${coinDataGeneral.Twitter}`" target="_blank">
            Twitter
            <i class="fa fa-twitter" aria-hidden="true"></i>
          </a>
          <p class="price"><strong>{{ socketData.PRICE + currency }}</strong>
            <span :class="{ positive: isPercentChangePositive, negative: !isPercentChangePositive}">{{ pricePercentChange + "%" }}</span>
          </p>
          <p>Total coin supply: {{ coinDataGeneral.TotalCoinSupply}}</p>
          <p>Total coins mined: {{ coinDataGeneral.TotalCoinsMined}}</p>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <h3 class="title is-3">Description</h3>
          <div v-html="coinDataGeneral.Description"></div>
        </div>
      </section>
      <section class="section" v-show="coinDataGeneral.Features">
        <div class="container">
          <h3 class="title is-3">Features</h3>
          <div v-html="coinDataGeneral.Features"></div>
        </div>
      </section>
      <section class="section" v-show="coinDataGeneral.Technology">
        <div class="container">
          <h3 class="title is-3">Technology</h3>
          <div v-html="coinDataGeneral.Technology"></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Loader from './Loader.vue';
  import io from 'socket.io-client';
  import parseWebSocketPriceData from '../helpers/parseWebSocketPriceData';

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

      this.socket = io('wss://streamer.cryptocompare.com');
      this.subscription = [`5~CCCAGG~${this.coin}~${this.currency}`];
      this.socket.emit('SubAdd', { subs: this.subscription });
      this.socket.on("m", message => {
        const parsedData = parseWebSocketPriceData.CURRENT.unpack(message);
        const priceChange = ((parseFloat(parsedData.PRICE) - parseFloat(this.socketData.PRICE)) / this.socketData.PRICE) * 100;
        const percentChange = isNaN(parseFloat(priceChange).toFixed(5)) ? percentChange : parseFloat(priceChange).toFixed(5);
        this.pricePercentChange = percentChange ? percentChange : this.pricePercentChange;

        this.socketData = {...this.socketData, ...parsedData};
      });
    },

    destroyed() {
      this.socket.emit('SubRemove', { subs: this.subscription } );
      this.socket.close();
    },


    computed: {
      ...mapGetters(['coinDetails', 'loading', 'currency']),

      isCoinDetailsLoading() {
        if(this.loading.length != 0) {
          return this.loading.indexOf('coinDetails') === -1 ? false : true;
        }
      },

      coinDataGeneral() {
          return this.coinDetails.Data.General;
      },

      coinDataIco() {
        return this.coinDetails.Data.ICO;
      },

      isPercentChangePositive() {
        return parseFloat(this.pricePercentChange) > 0;
      }

    },

    methods: {
      ...mapActions(['fetchCoinDetails']),

      hasLink(link) {
        return typeof(link) == "string";
      },
    },

    components: {
      'app-Loader': Loader
    },

  }
</script>

<style scoped>
  .price {
    font-size: 2em;
  }

  .price >.positive {
    color: green;
  }

  .price >.negative {
    color:red;
  }

</style>
