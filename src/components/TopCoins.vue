<template>
  <section>
    <ol>
      <li v-for="coin in topCoins">
        {{ coin.symbol}}
      </li>
    </ol>

  </section>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  export default {
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
    created() {
      if(this.topCoins.length < 10) {
        this.fetchTopCoins();
      }
    }
  }
</script>

<style>

</style>
