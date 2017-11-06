<template>
  <div >
    <app-Loader v-if="isCoinDetailsLoading"></app-Loader>
    <div v-else>
      <img :src="`static/img/coins/${coin}.png`">
      <h1>{{ coinDataGeneral.H1Text }}</h1>
      <a :href="coinDataGeneral.AffiliateUrl" target="_blank">Website</a>
      <h3>Description</h3>
      <div v-html="coinDataGeneral.Description"></div>
      <br/>
      <h3>Features</h3>
      <div v-html="coinDataGeneral.Features"></div>
      <br/>
      <h3>Technology</h3>
      <div v-html="coinDataGeneral.Technology"></div>
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
      }

    },

    methods: {
      ...mapActions(['fetchCoinDetails'])
    },

    components: {
      'app-Loader': Loader
    }

  }
</script>

<style>

</style>
