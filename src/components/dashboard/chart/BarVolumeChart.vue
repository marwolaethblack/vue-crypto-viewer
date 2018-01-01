<template>
  <div>
    {{ error }}
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import parseHistoryVolumeData from '../../../helpers/parseHistoryVolumeData';
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
      google.charts.load('current', {packages: ['corechart', 'bar']});
      window.addEventListener('resize', debounce(this.drawChart,300));
    },

    mounted() {
      const { Response } = this.coinHistory;
      if(Response === 'Error') {
        this.error = "Volume chart not available. The market does not exist for this coin pair, try changing the exchange or currency";
      } else {
        this.error = "";
        this.loadChart();
      }

    },

    computed: {
      ...mapGetters(['currency', 'chartType']),

      chartOptions() {
        const options = {
            title: `Volume bar chart of ${this.coinHistory.CoinName} in ${this.currency}`,
            subtitle: `${niceChartTypeName(this.chartType)}`,
          
          hAxis: {
             isSlanted:true
          },
          legend: {
              position: 'top'
          },
          chartArea: {
            width: '91%',
          },
          width: '100%'


        };

        return options;
      },

      chartData() {
        let data = parseHistoryVolumeData(this.coinHistory, this.currency);
        data = google.visualization.arrayToDataTable(data);

        return data;
      }

    },

    methods: {
      drawChart() {
        this.chart = new google.visualization.ColumnChart(this.$el);
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
