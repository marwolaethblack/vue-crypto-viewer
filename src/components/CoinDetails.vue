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
          <span>Total coin supply: {{ coinDataGeneral.TotalCoinSupply}}</span>
          <span>Total coins mined: {{ coinDataGeneral.TotalCoinsMined}}</span>
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

  export default {

    data() {
      return {
        coin: ""
      }
    },

    created() {
      this.coin = this.$route.params.coin;
      this.fetchCoinDetails(this.coin);
    },


    computed: {
      ...mapGetters(['coinDetails', 'loading']),

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

    },

    methods: {
      ...mapActions(['fetchCoinDetails']),

      hasLink(link) {
        return typeof(link) == "string";
      }
    },

    components: {
      'app-Loader': Loader
    },

  }
</script>

<style>

</style>
