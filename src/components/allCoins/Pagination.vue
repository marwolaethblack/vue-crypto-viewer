<template>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <a class="pagination-previous" @click="goToPreviousPage">Previous</a>
    <a class="pagination-next" @click="goToNextPage">Next page</a>
    <ul class="pagination-list" v-show="currentPage < 3">
      <li><a class="pagination-link" :class="{'is-current': currentPage === 1}" aria-label="Goto page 1" @click="changePage(1)">1</a></li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li><a class="pagination-link" :class="{'is-current': currentPage === 2}" aria-label="Goto page 2" @click="changePage(2)">2</a></li>
      <li><a class="pagination-link" aria-label="Goto page 3" @click="changePage(3)">3</a></li>
      <li><a class="pagination-link" aria-label="Goto page 4" @click="changePage(4)">4</a></li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li><a class="pagination-link" :aria-label="`Goto page $[maxPages]`" @click="changePage(maxPages)">{{ maxPages }}</a></li>
    </ul>
    <ul class="pagination-list" v-show="currentPage >= 3 && currentPage + 2 < maxPages">
      <li><a class="pagination-link" aria-label="Goto page 1" @click="changePage(1)">1</a></li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li><a class="pagination-link" :aria-label="`Goto page ${prevPage}`" @click="changePage(prevPage)">{{ prevPage }}</a></li>
      <li><a class="pagination-link is-current" :aria-label="`Page ${currentPage}`" aria-current="page">{{ currentPage }}</a></li>
      <li><a class="pagination-link" :aria-label="`Goto page ${nextPage}`" @click="changePage(nextPage)">{{ nextPage }}</a></li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li><a class="pagination-link" :aria-label="`Goto page $[maxPages]`" @click="changePage(maxPages)">{{ maxPages }}</a></li>
    </ul>
    <ul class="pagination-list" v-show="currentPage + 2 >= maxPages">
      <li><a class="pagination-link" aria-label="Goto page 1" @click="changePage(1)">1</a></li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li><a class="pagination-link" :class="{'is-current': currentPage === (maxPages - 3)}" :aria-label="`Goto page ${maxPages - 3}`" @click="changePage(maxPages - 3)">{{ maxPages - 3 }}</a></li>
      <li><a class="pagination-link" :class="{'is-current': currentPage === (maxPages - 2)}" :aria-label="`Goto page ${maxPages - 2}`" @click="changePage(maxPages - 2)">{{ maxPages - 2 }}</a></li>
      <li><a class="pagination-link" :class="{'is-current': currentPage === (maxPages - 1)}" :aria-label="`Goto page ${maxPages - 1}`" @click="changePage(maxPages - 1)">{{ maxPages - 1 }}</a></li>
      <li><span class="pagination-ellipsis">&hellip;</span></li>
      <li><a class="pagination-link" :class="{'is-current': currentPage === maxPages}" :aria-label="`Goto page $[maxPages]`" @click="changePage(maxPages)">{{ maxPages }}</a></li>
    </ul>
  </nav>
</template>

<script>
  export default {

    props: ['maxPages', 'currentPage', 'changePage'],

    computed: {
      nextPage() {
        return this.currentPage + 1;
      },

      prevPage() {
        return this.currentPage - 1;
      }
    },

    methods: {
      goToNextPage() {
        if(this.currentPage != this.maxPages) {
          this.changePage(this.currentPage + 1);
        }
      },

      goToPreviousPage() {
        if(this.currentPage != 1) {
          this.changePage(this.currentPage - 1);
        }
      }
    }
  }

</script>

<style>

</style>
