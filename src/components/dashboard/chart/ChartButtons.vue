<template>
  <div>
    <h3>Show data from</h3>
    <button class="button" v-for="type in chartTypes" @click="changeChartType(type)">{{ nicerChartTypeName(type) }}</button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import chartTypes from '../../../constants/chartTypes';

  export default {

    data() {
      return {
        chartTypes
      }
    },

    methods: {
      ...mapActions(['changeChartType']),
      nicerChartTypeName(type) {
        switch(type) {
          case 'month': {
            return 'Last 30 days';
            break;
          }

          case '24h': {
            return 'Last 24 hours';
            break;
          }

          case '6months': {
            return 'Last 6 months';
            break;
          }

          case 'year': {
            return 'Last year';
            break;
          }

          case 'all': {
            return 'All time';
            break;
          }
          default: break;
        }
      }
    },
  }


</script>

<style scoped>
  .button {
    background:#40ba84;
    color:white;
  }
</style>
