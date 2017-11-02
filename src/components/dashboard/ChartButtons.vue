<template>
  <div>
    <h4>Show data from</h4>
    <button @click="fetchCoinHistory(payload('month'))">Last 30 days</button>
    <button @click="fetchCoinHistory(payload('24h'))">Last 24 hours</button>
    <button @click="fetchCoinHistory(payload('6months'))">Last 6 months</button>
    <button @click="fetchCoinHistory(payload('year'))">Last year</button>
    <button @click="fetchCoinHistory(payload('all'))">All time</button>
  </div>
</template>

<script>

  export default {

    methods: {
      payload(type) {
        const { exchange, currency, selectedCoin } = this;
        return {
          exchange,
          currency,
          coin: selectedCoin,
          type
        }
      }
    },

    props: ['fetchCoinHistory', 'selectedCoin', 'currency', 'exchange']

  }


</script>
