<template>
<article @click="changeSelectedCoin(coin.symbol)" class="top-coin">
  <figure>
    <img :src="`static/img/coins/${coin.img}`"
         :key="coin.rank"
         @error="imgError"
         :alt="coin.name"/>
    <figcaption>
      <p>{{ coin.symbol }}</p>
      <p>{{ coin.name }}</p>
    </figcaption>
    <span>{{ price }}</span>
    <router-link :to="`/coins/${coin.symbol}/details`">Details</router-link>
  </figure>
</article>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {

    props: ['coin'],

    computed: {
      ...mapGetters(['currency', 'exchange']),
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

<style>
  .top-coin:hover {
    cursor: pointer;
    transform: scale(1.01);
  }
</style>
