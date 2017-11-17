<template>
  <div>
    {{ error }}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import parseHistoryData from '../../../helpers/parseHistoryData';

  export default {

    data() {
      return {
        error: ""
      }
    },

    mounted() {
      const { Response } = this.coinHistory;
      if(Response === 'Error') {
        this.error = "The market does not exist for this coin pair, try changing the exchange or currency";
      } else {
        this.error = "";
        this.loadChart();
      }
    },

    computed: {
      ...mapGetters(['currency']),
    },

    methods: {
      drawChart() {
        let data = parseHistoryData(this.coinHistory, this.currency);
        data = google.visualization.arrayToDataTable(data, true);
        data.setColumnProperty(5, 'role', 'tooltip');

        const options = {
          legend: 'none',
          title: `Open-high-low-close chart of ${this.coinHistory.CoinName} price`,
          chartArea: {
            width: '91%',
          },
          width: '100%'
        };

        const chart = new google.visualization.CandlestickChart(this.$el);

        chart.draw(data, options);
      },

      loadChart() {
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(this.drawChart);
      }
    },

    props: ['coinHistory']
  }

</script>

<style>

</style>
