<template>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">
      Exchange {{ exchange }}
    </a>

    <div class="navbar-dropdown ">
      <a class="navbar-item" v-for="exchange in exchanges" :key="exchange" @click="changeExchange(exchange)">
        {{ exchange }}
      </a>
    </div>
  </div>
</template>

<script>
  import exchanges from '../../../constants/exchanges';

  export default {
    data() {
      return {
        exchanges
      }
    },

    props: ['exchange', 'changeExchange']
  }
</script>

<style>

</style>
