<template>
  <header>
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
       <router-link to="/" tag="a">
          <span>CryptoVuewer</span>
       </router-link>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            Currency {{ currency }}
          </a>

          <div class="navbar-dropdown is-right">
            <a class="navbar-item" v-for="currency in currencies" key="currency" @click="changeCurrency(currency)">
              {{ currency }}
            </a>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import currencies from '../../constants/currencies';
  export default {
    data() {
      return {
        currencies
      }
    },

    computed: {
      ...mapGetters(['currency'])
    },

    methods: {
      ...mapActions(['changeCurrency'])
    }

  }
</script>

<style>

</style>
