
<template>
  <!-- Renders the buttons to load charts for different time spans e.g price data for 1 week, 1 month... -->
  <div>
    <h3>Show data from</h3>
    <button class="button" :class="{active: chartType === type}" v-for="type in chartTypes" @click="changeChartType(type)">{{ niceChartTypeName(type) }}</button>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import chartTypes from '../../../constants/chartTypes';
  import niceChartTypeName from '../../../helpers/niceChartTypeName';

  export default {

    data() {
      return {
        chartTypes
      }
    },
    
    computed: {
      ...mapGetters(['chartType'])
    },

    methods: {
      ...mapActions(['changeChartType']),

      niceChartTypeName(type) {
        return niceChartTypeName(type);
      }
    },


  }


</script>

<style scoped>
  .button {
    background:#40ba84;
    color:white;
  }
  
  .active {
    background: #35495e;
  }
</style>
