<template>
  <router-link :to="`/coins/${coin.Name}/details`">
    <figure>
      <img :src="imageSource"
           :title="coin.FullName"
           @error="imgError"
      >
      <figcaption>
        {{ coin.Name }}
      </figcaption>
    </figure>
  </router-link>
</template>

<script>
  export default {
    props: ['coin'],

    computed: {
      imageSource() {
        let { Name } = this.coin;
        const index = Name.indexOf('*');
        if(index != -1) {
           Name = Name.replace('*','');
        }

        return `/static/img/coins/${Name}.webp`;

      }
    },

    methods: {
      imgError(e) {
        e.target.src = "https://www.cryptocompare.com" + this.coin.ImageUrl;
        console.log(this.coin.ImageUrl);
        console.log("Switch to chrome to view .webp images");
      }
    }
  }

</script>

<style>

</style>
