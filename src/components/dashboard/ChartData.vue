<template>
  <div>
    <!--Either show loader or graph display component with menu-->
    <app-loader v-if="isCoinHistoryLoading" style="width: 900px; height: 500px;"></app-loader>
    <div v-else style="width: 900px; height: 500px;">
      <p >{{ selectedCoin }}</p>
      <!--Chart-->
      <app-Chart :coinHistory="coinHistory" style="width: 900px; height: 500px;"></app-Chart>
      <!--Chart buttons e.g graph of prices of this week, month , year...-->
      <app-ChartButtons ></app-ChartButtons>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Loader from '../Loader.vue';
  import Chart from './Chart.vue';
  import ChartButtons from './ChartButtons.vue';

  export default {

    computed: {
      ...mapGetters(['coinHistory', 'selectedCoin', 'loading']),
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
      'app-Chart': Chart,
      'app-ChartButtons': ChartButtons
    },

    created() {
      //Check if coinHistory loaded from API if not load
      if(!this.coinHistory.hasOwnProperty('Data')) {
        this.fetchCoinHistory();
      }
    }

  }

</script>

<style>

</style>
