<template>
<article  class="top-coin" :title="coin.name" @click="changeSelectedCoin(coin.symbol)" :class="{selected: selectedCoin === coin.symbol}">
  <figure>
    <img :src="`static/img/coins/webp/${coin.img}`"
         :key="coin.rank"
         @error="imgError"
         :alt="coin.name"
         class="coin-img"
    />
    <figcaption>
      <h2><strong>{{ coin.symbol }}</strong></h2>
      <h3>{{ coin.name }}</h3>
    </figcaption>
    <strong class="price">{{ price }}</strong>
    <strong title="Percent change in the past hour"
            class="change"
            :class="{positive: coin.percent_change_1h > 0, negative: coin.percent_change_1h < 0}"
    >
            {{ coin.percent_change_1h + "%"}}
      </strong>
  </figure>
  <router-link class="details" :to="`/coins/${coin.symbol}/details`">Show Details</router-link>
</article>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import webpSupport from '../../../helpers/hasWebpSupport';
  export default {

    props: ['coin'],

    computed: {
      ...mapGetters(['currency', 'exchange', 'selectedCoin']),
      
      //Rounds the price to 3 decimals and changes it into locale format
      price() {
        const parsedNumber = this.coin[`price_${this.currency.toLowerCase()}`];
        if(parsedNumber) {
          const numberString = parsedNumber.toLocaleString();
          return numberString.substring(0, numberString.indexOf(".") + 4) + " " + this.currency;
        } else {
          const pN = this.coin[`price_usd`];
          const nS = pN.toLocaleString();
          return nS.substring(0, nS.indexOf(".") + 4) + " " + "USD";
        }
      }
    },


    
    methods: {
      ...mapActions(['changeSelectedCoin']),
      
      //If the browser does not support the WEBP format it loads a png image,
      //If it does but the image still throws an error it loads the image from the api CDN
      async imgError(e) {
        if(await webpSupport()) {
          e.target.src = "http://via.placeholder.com/180x180";
        } else {
          const index = this.coin.img.indexOf('.');
          const imageString = this.coin.img.substring(0, index != -1 ? index : this.coin.img.length);
          e.target.src = `static/img/coins/png/${imageString}.png`;
        }
      }
    }

  }
</script>

<style scoped>
  .top-coin {
    margin: 0.2em;
    padding: 1em;
  }

  .top-coin:hover {
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
  }


  .coin-img {
    max-width: 130px;
    max-height: 130px;
  }

  .selected {
    background: #e5eaec;
  }

  .details {
    font-size: 1.5em;
    margin-left: 2rem;
  }
  
  .positive {
    color: green;
  }
  
  .negative {
    color: red;
  }
  
  .price {
    font-size: 1.5em;
  }
  
  .change {
    font-size: 1.2em;
  }
</style>
