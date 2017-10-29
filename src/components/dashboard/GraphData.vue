<template>
  <div>
    {{ selectedCoin }}
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {

    computed: {
      ...mapGetters(['coinHistory', 'selectedCoin']),
    },

    methods: {
      ...mapActions(['fetchCoinHistory'])
    },

    created() {
      if(!this.coinHistory.hasOwnProperty('Data')) {
        this.fetchCoinHistory(this.selectedCoin);
      }
    }

  }

</script>

<style>

</style>
