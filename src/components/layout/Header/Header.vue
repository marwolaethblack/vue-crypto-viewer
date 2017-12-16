<template>
  <header>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
       <router-link to="/" tag="a" >
          <span>CryptoVuewer</span>
       </router-link>
        <router-link to="/coins/all?page=1" tag="a">
          <span>See all coins</span>
        </router-link>
        <div class="navbar-burger burger" data-target="navMenuTransparentExample" @click="toggleDisplayMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu" ref="menu">
        <div class="navbar-end">
          <app-currencyDropdown :currency="currency"
                                :changeCurrency="changeCurrency"
                                :currencies="currencies"
          ></app-currencyDropdown>
          <app-exchangeDropdown :exchange="exchange"
                                :changeExchange="changeExchange"
                                :exchanges="exchanges"
          ></app-exchangeDropdown>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import CurrencyDropdown from './CurrencyDropdown.vue';
  import ExchangeDropdown from './ExchangeDropdown.vue';
  import currencies from '../../../constants/currencies';
  import exchanges from '../../../constants/exchanges';

  export default {

    computed: {
      ...mapGetters(['currency', 'exchange']),

      currencies() {
        return currencies;
      },

      exchanges() {
        return exchanges;
      }

    },

    methods: {
      ...mapActions(['changeCurrency', 'changeExchange']),
      toggleDisplayMenu() {
        this.$refs.menu.classList.toggle("is-active");
      }
    },

    components: {
      'app-currencyDropdown': CurrencyDropdown,
      'app-exchangeDropdown': ExchangeDropdown
    }

  }
</script>

<style scoped>
  header {
    margin-bottom: 2em;
  }

  .navbar-brand a {
    color: white;
    display: flex;
    justify-content: center;
    padding: 1em;
  }

  .navbar-brand a:hover {
    background: #252525;
  }
</style>
