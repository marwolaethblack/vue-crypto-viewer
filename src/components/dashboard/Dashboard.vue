<template>
  <div>
    <app-topCoinList :topCoins="topCoins"></app-topCoinList>
    <app-graphData></app-graphData>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import TopCoinList from './TopCoinsList.vue';
  import GraphData from './ChartData.vue';
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
      'app-graphData': GraphData
    }
  }
</script>

<style>

</style>
