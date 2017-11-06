<template>
  <div v-if="!isCoinDetailsLoading">
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
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

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
    }

  }
</script>

<style>

</style>
