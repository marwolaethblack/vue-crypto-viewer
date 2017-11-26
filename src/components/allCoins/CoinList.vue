<template>
  <ul class="coin-list">
    <li v-for="(value, coin) in allCoins">
      <app-Coin :coin="value"></app-Coin>
    </li>
  </ul>
</template>

<script>
  import Coin from './Coin.vue';

  export default {
    props: ['allCoins'],

    components: {
      'app-Coin': Coin
    }
  }

</script>

<style scoped>
  .coin-list {
    display: flex;
    flex-wrap: wrap;
  }

</style>
