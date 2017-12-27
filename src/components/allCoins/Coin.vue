<template>
  <router-link :to="`/coins/${coin.Name}/details`">
    <figure>
      <img :src="imageSource"
           :title="coin.FullName"
           @error="imgError"
           class="coin-img"
      >
      <figcaption>
        {{ coin.Name }}
      </figcaption>
    </figure>
  </router-link>
</template>

<script>
  import webpSupport from '../../helpers/hasWebpSupport'

  export default {
    props: ['coin'],

    computed: {
      imageSource() {
        let { Name } = this.coin;
        Name = this.fixCoinName(Name);

        return `/static/img/coins/webp/${Name}.webp`;

      }
    },

    methods: {
      fixCoinName(coinName) {
        let Name = coinName;
        const index = Name.indexOf('*');
        if(index != -1) {
          Name = Name.replace('*','');
        }

        return Name;
      },

      //If the browser does not support the WEBP format it loads a png image,
      //If it does but the image still throws an error it loads the image from the api CDN
      async imgError(e) {
        if(await webpSupport()) {
          e.target.src = "https://www.cryptocompare.com" + this.coin.ImageUrl;
        } else {
          let Name = this.fixCoinName(this.coin.Name);
          e.target.src = `/static/img/coins/png/${Name}.png`;
        }
      }
    }
  }

</script>

<style>
  .coin-img {
    max-width: 180px;
    max-height: 180px;
  }


</style>
