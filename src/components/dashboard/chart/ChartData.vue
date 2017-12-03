<template>
  <div>
    <!--Either show loader or graph display component with menu-->
    <app-loader v-if="isCoinHistoryLoading" style="min-width: 98%; min-height: 65vh;"></app-loader>
    <div v-else style="width: 100%; height: 65vh; position:relative">
      <!--Chart-->
      <span class="percent-change" :class="{ positive: isPercentChangPositive, negative: !isPercentChangPositive }">{{ percentChange + "%"}}</span>
      <app-Chart :coinHistory="coinHistory" style="min-width: 98%; min-height: 100%;"></app-Chart>
      <!--Chart buttons e.g graph of prices of this week, month , year...-->
      <app-ChartButtons></app-ChartButtons>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
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
          const oldPrice = this.coinHistory.Data.find(x => x.close !== 0).close;
          const newPrice = this.coinHistory.Data[this.coinHistory.Data.length - 1].close;
          const change = ((newPrice -  oldPrice) / oldPrice) * 100;
          return parseFloat(change).toFixed(3);
        } else {
          return 0;
        }
      },

      isPercentChangPositive() {
        return parseFloat(this.percentChange)  > 0;
      },

    },

    components: {
      'app-loader': Loader,
      'app-Chart': Chart,
      'app-ChartButtons': ChartButtons
    },
  }

</script>

<style scoped>
  .percent-change {
    position: absolute;
    top: 11%;
    right: 3%;
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
