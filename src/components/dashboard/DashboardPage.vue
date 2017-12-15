<template>
  <div>
    <app-topCoinList :topCoins="topCoins"></app-topCoinList>
    <app-chartData></app-chartData>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import TopCoinList from './topCoins/TopCoinsList.vue';
  import ChartData from './chart/ChartData.vue';
  export default {
    created() {;
      this.fetchTopCoins();
      this.changeSelectedCoin('BTC');
    },

    computed: {
      ...mapGetters([
        'topCoins'
      ])
    },
    methods: {
      ...mapActions([
        'fetchTopCoins',
        'changeSelectedCoin'
      ])
    },
    components: {
      'app-topCoinList': TopCoinList,
      'app-chartData': ChartData
    }
  }
</script>

<style>

</style>
