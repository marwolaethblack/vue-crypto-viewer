<template>
<article  class="top-coin" :title="coin.name" @click="changeSelectedCoin(coin.symbol)" :class="{selected: selectedCoin === coin.symbol}">
  <figure>
    <img :src="`static/img/coins/${coin.img}`"
         :key="coin.rank"
         @error="imgError"
         :alt="coin.name"
         class="coin-img"
    />
    <figcaption>
      <h2><strong>{{ coin.symbol }}</strong></h2>
      <h3>{{ coin.name }}</h3>
    </figcaption>
    <strong>{{ price }}</strong>
  </figure>
  <router-link :to="`/coins/${coin.symbol}/details`">Details</router-link>
</article>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {

    props: ['coin'],

    computed: {
      ...mapGetters(['currency', 'exchange', 'selectedCoin']),
      price() {
        const parsedNumber = this.coin[`price_${this.currency.toLowerCase()}`];
        if(parsedNumber) {
          const numberString = parsedNumber.toLocaleString();
          return numberString.substring(0, numberString.indexOf(".") + 4) + " " + this.currency;
        }
      }
    },

    methods: {
      ...mapActions(['changeSelectedCoin']),
      imgError(e) {
        e.target.src = "http://via.placeholder.com/180x180";
        console.log("Switch to chrome to view .webp images");
      }
    }

  }
</script>

<style scoped>
  .top-coin {
    margin: 1em;
    padding: 1em;
  }

  .top-coin:hover {
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
  }


  .coin-img {
    max-width: 150px;
    max-height: 150px;
  }

  .selected {
    background: #e5eaec;
  }
</style>
