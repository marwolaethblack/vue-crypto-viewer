<template>
  <div>
    <!--Either show loader or graph display component with menu-->
    <app-loader v-if="isCoinHistoryLoading" style="width: 900px; height: 500px;"></app-loader>
    <div v-else style="width: 900px; height: 500px;">
      <p >{{ selectedCoin }}</p>
      <!--Graph-->
      <app-Chart :coinHistory="coinHistory" style="width: 900px; height: 500px;"></app-Chart>
      <!--Graph buttons e.g graph of prices of this week, month , year...-->
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Loader from '../Loader.vue';
  import Chart from './Chart.vue';

  export default {

    computed: {
      ...mapGetters(['coinHistory', 'selectedCoin', 'loading', 'currency', 'exchange']),
      isCoinHistoryLoading() {
        if(this.loading.length != 0) {
          return this.loading.indexOf('coinHistory') === -1 ? false : true;
        }
      }
    },

    methods: {
      ...mapActions(['fetchCoinHistory'])
    },

    components: {
      'app-loader': Loader,
      'app-Chart': Chart
    },

    created() {
      if(!this.coinHistory.hasOwnProperty('Data')) {
        const payload = {
          currency: this.currency,
          coin: this.selectedCoin,
          exchange: this.exchange,
        };
        this.fetchCoinHistory(payload);
      }
    }

  }

</script>

<style>

</style>
