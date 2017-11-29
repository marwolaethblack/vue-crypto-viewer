<template>
    <div class="control search-input">
      <input class="input" type="text" placeholder="Search" :value="formInput" @input="formInput = $event.target.value">
      <ul class="search-results">
        <router-link tag="li" v-for="result in searchResults"  :to="`/coins/${result.Symbol}/details`" :key="result.Symbol" class="search-result">
          {{result.FullName}}
        </router-link>
      </ul>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        formInput: ""
      }
    },

    computed: {
      searchResults() {
        let results = [];
         if(this.formInput.length > 1) {

           this.allCoins.forEach((array,index) => {

             Object.keys(array).forEach(coin => {
               if(array[coin].FullName.toLowerCase().indexOf(this.formInput.toLowerCase()) !== -1 || coin.toLowerCase().indexOf(this.formInput.toLowerCase()) !== -1) {
                 results.push(array[coin]);
               }
             });

           });
         }

        return results;
      },
    },

    props: ['allCoins']
  }
</script>

<style>
  .search-results {
    z-index: 10;
    position:absolute;
    background:white;
    width: 100%;
  }

  .search-result {
    padding: 1em;
  }

  .search-result:hover {
    background: black;
    color:white;
  }

  .search-input {
    min-width: 300px;
    max-width: 450px;
    margin: 20px auto;
  }


</style>
