<template>
  <div>
    Chart
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    mounted() {
      this.loadChart();
    },

    computed: {
      parseData() {
        const data = [];
        this.coinHistory.Data.forEach(priceData => {
          const {high, low, open, close} = priceData;
          const date = moment.unix(priceData.time).format('Do MMM');
          data.push([date, low, open, close, high, `Open: ${open}$\nHigh: ${high}$\nLow: ${low}$\nClose: ${close}$`]);
        });
        return data;
      },
    },

    methods: {
      drawChart() {
        let data = this.parseData;
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
