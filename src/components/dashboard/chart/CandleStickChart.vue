<template>
  <div>
    {{ error }}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import parseHistoryPriceData from '../../../helpers/parseHistoryPriceData';
  import niceChartTypeName from '../../../helpers/niceChartTypeName';
  import debounce from '../../../helpers/debouncer';

  export default {

    data() {
      return {
        error: "",
        chart: {}
      }
    },

    created() {
      //Load google charts packages and add a listener to the resize event so the chart is responsive
      google.charts.load('current', {'packages': ['corechart']});
      window.addEventListener('resize', debounce(this.drawChart,300));
    },

    mounted() {
      const { Response, Data } = this.coinHistory;
      if(Response === 'Error' || Data.length < 1) {
        this.error = "OHLC Chart not available. The market does not exist for this coin pair, try changing the exchange or currency";
      } else {
        this.error = "";
        this.loadChart();
      }

    },

    computed: {
      ...mapGetters(['currency', 'chartType', 'exchange']),

      chartOptions() {
        const options = {
          legend: 'none',
          title: `Open-High-Low-Close Chart\n${this.coinHistory.CoinName} - ${this.currency}\n${this.exchange}\n${niceChartTypeName(this.chartType)}`,
          chartArea: {
            width: '91%',
          },
          width: '100%'
        };

        return options;
      },

      chartData() {
        let data = parseHistoryPriceData(this.coinHistory, this.currency);
        data = google.visualization.arrayToDataTable(data, true);
        data.setColumnProperty(5, 'role', 'tooltip');

        return data;
      }

    },

    methods: {
      drawChart() {
        this.chart = new google.visualization.CandlestickChart(this.$el);
        this.chart.draw(this.chartData, this.chartOptions);
      },

      loadChart() {
        google.charts.setOnLoadCallback(this.drawChart);
      }

    },

    props: ['coinHistory'],

    destroyed() {
      window.removeEventListener('resize', debounce(this.drawChart,300));
    }
  }

</script>

<style>

</style>
