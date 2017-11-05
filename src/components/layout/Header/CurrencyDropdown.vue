<template>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">
      Currency {{ currency }}
    </a>

    <div class="navbar-dropdown ">
      <a class="navbar-item" v-for="currency in currencies" :key="currency" @click="changeCurrency(currency)">
        {{ currency }}
      </a>
    </div>
  </div>
</template>

<script>
  import currencies from '../../../constants/currencies';

  export default {
    data() {
      return {
        currencies
      }
    },

    props: ['currency', 'changeCurrency']
  }
</script>

<style>

</style>
