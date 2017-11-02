<template>
<article @click="changeSelectedCoin(coin.symbol)">
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
          return parsedNumber.toLocaleString() + " " + this.currency;
        }
      }
    },

    methods: {
      ...mapActions(['changeSelectedCoin']),
      imgError(e) {
        e.target.src = "http://via.placeholder.com/180x180";
      }
    }

  }
</script>

<style>


</style>
