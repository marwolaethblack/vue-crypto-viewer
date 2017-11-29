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
    justify-content: center;
  }

  .coin-list li {
    margin: 1%;
    box-shadow: 10px 5px 5px #ddd8c7;
    border-radius: 10px;
  }

  .coin-list li:hover {
    transform: scale(1.03);
  }


</style>
