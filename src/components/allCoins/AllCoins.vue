<template>
  <div>
    <app-Loader v-if="isAllCoinsLoading"></app-Loader>
    <div v-else>
      <app-CoinSearch :allCoins="allCoins"></app-CoinSearch>
      <app-CoinList :allCoins="allCoins[currentPage-1]"></app-CoinList>
      <app-Pagination :currentPage="currentPage"
                        :maxPages="maxPages"
                        :changePage="changePage"
    ></app-Pagination>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Loader from '../Loader.vue';
  import Pagination from './Pagination.vue';
  import CoinList from './CoinList.vue';
  import CoinSearch from './CoinSearch.vue';

  export default {

    created() {
      this.fetchAllCoins();
    },

    computed: {
      ...mapGetters(['loading', 'allCoins']),
      isAllCoinsLoading() {
        if (this.loading.length != 0) {
          return this.loading.indexOf('allCoins') === -1 ? false : true;
        }
      },

      maxPages() {
        return this.allCoins.length;
      },

      currentPage() {
        return parseInt(this.$route.query.page);
      }

    },

    methods: {
      ...mapActions(['fetchAllCoins']),

      changePage(page) {
        this.$router.push({ path: '/coins/all', query: { page }});
      }

    },

    components: {
      'app-Loader': Loader,
      'app-Pagination': Pagination,
      'app-CoinList': CoinList,
      'app-CoinSearch': CoinSearch
    }

  }

</script>

<style>

</style>
