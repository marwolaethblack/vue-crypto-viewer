<template>
<article>
  <figure>
    <img :src="`static/img/coins/${coin.img}`" :key="coin.rank" @error="imgError" :alt="coin.name"/>
    <figcaption>
      <p>{{ coin.symbol }}</p>
      <p>{{ coin.name }}</p>
    </figcaption>
    <span>{{ coin[`price_${currency}`] + "$" }}</span>
  </figure>
</article>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'currency'
      ])
    },
    props: ['coin'],
    methods: {
      imgError(e) {
        e.target.src = "http://via.placeholder.com/180x180";
      }
    }
  }
</script>

<style>


</style>
