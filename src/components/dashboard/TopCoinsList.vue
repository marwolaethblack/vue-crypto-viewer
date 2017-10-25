<template>
  <section>
    <ol>
      <li v-for="coin in topCoins">
        <app-top-coin :coin="coin"></app-top-coin>
      </li>
    </ol>

  </section>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import TopCoin from './TopCoin.vue';
  export default {

    created() {
      if(this.topCoins.length < 10) {
        this.fetchTopCoins();
      }
    },
    computed: {
      ...mapGetters([
        'topCoins'
      ])
    },
    methods: {
      ...mapActions([
        'fetchTopCoins'
      ])
    },
    components: {
      'app-top-coin': TopCoin
    }

  }
</script>

<style>

</style>
