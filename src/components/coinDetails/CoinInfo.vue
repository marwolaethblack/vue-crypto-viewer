<template>
  <div>
    <section class="section">
      <div class="container">
        <img :src="imageSource" @error="imgError">
        <h1 class="title is-1">{{ coinDataGeneral.H1Text }}</h1>
        <a v-show="hasLink(coinDataGeneral.AffiliateUrl)" :href="coinDataGeneral.AffiliateUrl" target="_blank">Website</a>
        <a v-show="hasLink(coinDataIco.BlogLink)" :href="coinDataIco.BlogLink" target="_blank">Blog</a>
        <a v-show="hasLink(coinDataIco.WhitePaperLink)" :href="coinDataIco.WhitePaperLink" target="_blank">WhitePaper</a>
        <app-coinSocialStats :coin="coin"></app-coinSocialStats>
        <p class="price" v-if="socketData.PRICE"><strong>{{ socketData.PRICE + " USD" }}</strong>
          <span :class="{ positive: isPercentChangePositive, negative: !isPercentChangePositive}">{{ pricePercentChange + "%" }}</span>
          <i class="fa fa-question" aria-hidden="true" title="Due to api restrictions real time price data is only offered in USD"></i>
        </p>
        <p v-else><strong>No real time price data available</strong></p>
        <p>Total coin supply: {{ coinDataGeneral.TotalCoinSupply}}</p>
        <p>Total coins mined: {{ coinDataGeneral.TotalCoinsMined}}</p>
      </div>
    </section>
    <section class="section">
      <app-ChartData class="chart"></app-ChartData>
    </section>
    <section class="section">
      <div class="container">
        <h3 class="title is-3">Description</h3>
        <div v-html="coinDataGeneral.Description"></div>
      </div>
    </section>
    <section class="section" v-show="coinDataGeneral.Features">
      <div class="container">
        <h3 class="title is-3">Features</h3>
        <div v-html="coinDataGeneral.Features"></div>
      </div>
    </section>
    <section class="section" v-show="coinDataGeneral.Technology">
      <div class="container">
        <h3 class="title is-3">Technology</h3>
        <div v-html="coinDataGeneral.Technology"></div>
      </div>
    </section>
  </div>
</template>

<script>
  import ChartData from '../dashboard/chart/ChartData.vue'
  import webpSupport from '../../helpers/hasWebpSupport'
  import SocialStats from './SocialStats.vue'

  export default {
    props: ['coinDetails', 'coin', 'socketData', 'pricePercentChange'],

    computed: {

      coinDataGeneral() {
        return this.coinDetails.Data.General;
      },

      coinDataIco() {
        return this.coinDetails.Data.ICO;
      },

      isPercentChangePositive() {
        return parseFloat(this.pricePercentChange) > 0;
      },

      imageSource() {
        const Name = this.fixCoinName(this.coin);
        return `/static/img/coins/webp/${Name}.webp`;

      },
    },

    methods: {
      hasLink(link) {
        return typeof(link) === "string";
      },

      //Removes special characters from coin names, which are not present in image names so they can load
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
          e.target.src = "https://www.cryptocompare.com" + this.coinDataGeneral.ImageUrl;
        } else {
          let Name = this.fixCoinName(this.coin);
          e.target.src = `/static/img/coins/png/${Name}.png`;
        }
      }
    },

    components: {
      'app-ChartData': ChartData,
      'app-coinSocialStats': SocialStats
    }

  }
</script>

<style scoped>
  .price {
    font-size: 2em;
    padding: 20px 10px 10px 10px;
  }

  .price >.positive {
    color: green;
  }

  .price >.negative {
    color:red;
  }

  .chart {
    margin-bottom: 3em;
  }


</style>
