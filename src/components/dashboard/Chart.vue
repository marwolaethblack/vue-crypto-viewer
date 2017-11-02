<template>
  <div>
    Chart
  </div>
</template>

<script>
  import moment from 'moment';
  import { mapGetters } from 'vuex';

  export default {
    mounted() {
      this.loadChart();
    },

    computed: {
      ...mapGetters(['currency']),
      //Parsed price data from request
      //Returns array of arrays
      parseData() {
        const data = [];
        let format = 'Do MMM';
        const type = this.coinHistory.TimeTo - this.coinHistory.TimeFrom;

        switch(type) {
          //24hr
          case 86400: {
            format = 'h A UTC Z';
            break;
          }
          //30days
          case 2592000: {
            format = 'Do MMM';
            break;
          }

          default: {
            format = 'Do MMM YYYY';
            break;
          }
        }
        this.coinHistory.Data.forEach(priceData => {
          const {high, low, open, close} = priceData;
          const date = moment.unix(priceData.time).format(format);
          data.push([date, low, open, close, high, `Open: ${open}${this.currency}\nHigh: ${high}${this.currency}\nLow: ${low}${this.currency}\nClose: ${close}${this.currency}`]);
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
