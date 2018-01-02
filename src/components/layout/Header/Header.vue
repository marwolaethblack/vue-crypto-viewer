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
           <app-Dropdown :currentSelection="currency"
                         :dropDownData="currencies"
                         :changeSelection="changeCurrency">
            <span slot="dropDownName">Currency &nbsp;</span>
          </app-Dropdown>
          <app-Dropdown :currentSelection="exchange"
                        :dropDownData="exchanges"
                        :changeSelection="changeExchange">
            <span slot="dropDownName">Exchange &nbsp;</span>
          </app-Dropdown>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Dropdown from './Dropdown.vue';
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
      'app-Dropdown': Dropdown
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
