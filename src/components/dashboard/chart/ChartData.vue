<template>
  <div>
    <!--Either show loader or graph display component with menu-->
    <app-loader v-if="isCoinHistoryLoading" style="width: 98%vw; height: 65vh;"></app-loader>
    <div v-else style="width: 100%; height: 65vh; position:relative">
      <!--Chart-->
      <span class="percent-change" :class="{ positive: percentChangPositive, negative: !percentChangPositive }">{{ percentChange + "%"}}</span>
      <app-Chart :coinHistory="coinHistory" style="width: 98%; height: 100%;"></app-Chart>
      <!--Chart buttons e.g graph of prices of this week, month , year...-->
      <app-ChartButtons ></app-ChartButtons>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Loader from '../../Loader.vue';
  import Chart from './CandleStickChart.vue';
  import ChartButtons from './ChartButtons.vue';

  export default {

    computed: {
      ...mapGetters(['coinHistory', 'selectedCoin', 'loading']),
      isCoinHistoryLoading() {
        if(this.loading.length != 0) {
          return this.loading.indexOf('coinHistory') === -1 ? false : true;
        }
      },

      percentChange() {
        if(this.coinHistory.Data.length) {
          const oldPrice = this.coinHistory.Data[0].close;
          const newPrice = this.coinHistory.Data[this.coinHistory.Data.length - 1].close;
          const change = ((newPrice -  oldPrice) / oldPrice) * 100;
          return parseFloat(change).toFixed(2);
        } else {
          return 0;
        }
      },

      percentChangPositive() {
        return parseFloat(this.percentChange)  > 0;
      },

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

<style scoped>
  .percent-change {
    position: absolute;
    top: 11%;
    left:80%;
    z-index: 10;
    font-size: 1.3em;
  }

  .positive {
    color: green;
  }

  .negative {
    color:red;
  }


</style>
