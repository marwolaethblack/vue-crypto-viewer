<template>
  <div>
    <app-Loader v-if="isAllCoinsLoading"></app-Loader>
    <div v-else>
      <ul>
        <li v-for="(value, coin) in allCoins[currentPage-1]">
          {{ coin }}
        </li>
      </ul>

      <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <a class="pagination-previous" @click="currentPage != 1 ? currentPage-- : currentPage">Previous</a>
        <a class="pagination-next" @click="currentPage != maxPages ? currentPage++ : currentPage">Next page</a>
        <ul class="pagination-list">
          <li><a class="pagination-link is-current" aria-label="Goto page 1" @click="currentPage=1">1</a></li>
          <li><span class="pagination-ellipsis">&hellip;</span></li>
          <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
          <li><a class="pagination-link" aria-label="Page 46" aria-current="page">46</a></li>
          <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
          <li><span class="pagination-ellipsis">&hellip;</span></li>
          <li><a class="pagination-link" :aria-label="`Goto page $[maxPages]`" @click="currentPage = maxPages">{{ maxPages }}</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Loader from './Loader.vue';

  export default {

    data() {
      return{
        currentPage: 1,

      }
    },

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
      }

    },

    methods: {
      ...mapActions(['fetchAllCoins']),

    },

    components: {
      'app-Loader': Loader
    }

  }

</script>

<style>

</style>
