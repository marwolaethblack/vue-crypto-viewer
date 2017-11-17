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
    created() {
      if(this.topCoins.length < 10) {
        this.fetchTopCoins();
      }
    },
    computed: {
      ...mapGetters([
        'topCoins'
      ])
    },
    methods: {
      ...mapActions([
        'fetchTopCoins'
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
