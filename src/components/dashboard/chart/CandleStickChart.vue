<template>
  <div>
    {{ error }}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import parseHistoryData from '../../../helpers/parseHistoryData';
  import debounce from '../../../helpers/debouncer';

  export default {

    data() {
      return {
        error: "",
        chart: {}
      }
    },

    created() {
      google.charts.load('current', {'packages': ['corechart']});
      window.addEventListener('resize', debounce(this.drawChart,300));
    },

    mounted() {
      const { Response } = this.coinHistory;
      if(Response === 'Error') {
        this.error = "OHLC Chart not available. The market does not exist for this coin pair, try changing the exchange or currency";
      } else {
        this.error = "";
        this.loadChart();
      }

    },

    computed: {
      ...mapGetters(['currency']),

      chartOptions() {
        const options = {
          legend: 'none',
          title: `Open-high-low-close chart of ${this.coinHistory.CoinName} price`,
          chartArea: {
            width: '91%',
          },
          width: '100%'
        };

        return options;
      },

      chartData() {
        let data = parseHistoryData(this.coinHistory, this.currency);
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

    props: ['coinHistory']
  }

</script>

<style>

</style>
