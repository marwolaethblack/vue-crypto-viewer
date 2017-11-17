<template>
  <section>
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
</style>
