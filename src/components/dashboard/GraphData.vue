<template>
  <div>
    <app-loader v-show="isLoading"></app-loader>
    <p v-show="!isLoading">{{ selectedCoin }}</p>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Loader from '../Loader.vue';

  export default {

    computed: {
      ...mapGetters(['coinHistory', 'selectedCoin', 'loading']),
      isLoading() {
        if(this.loading.length != 0) {
          return this.loading.indexOf('coinHistory') === -1 ? false : true;
        }
      }
    },

    methods: {
      ...mapActions(['fetchCoinHistory'])
    },

    components: {
      'app-loader': Loader
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
