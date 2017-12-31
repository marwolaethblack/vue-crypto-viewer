<template>
  <section class="top-coins content is-small">
    <h1 class="h1">Top 10 coins by 24h volume</h1>
    <ol class="level is-mobile">
      <li v-for="coin in topCoins" class="level-item">
        <app-top-coin-list-item :coin="coin"
        ></app-top-coin-list-item>
      </li>
    </ol>
  </section>
</template>

<script>
  import TopCoinListItem from './TopCoinListItem.vue';
  export default {
    components: {
      'app-top-coin-list-item': TopCoinListItem
    },
    props: ['topCoins']

  }
</script>

<style>
.level {
  overflow-x: scroll;
  overflow-y: hidden;
}

.top-coins {
  margin-bottom: 3em;
}

.top-coins>h1 {
  text-align: center;
}

</style>
