<template>
  <div>
    Chart
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import parseHistoryData from '../../helpers/parseHistoryData';

  export default {
    mounted() {
      this.loadChart();
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
          legend: 'none'
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
