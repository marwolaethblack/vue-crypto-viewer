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


  export default {
    props: ['exchange', 'changeExchange', 'exchanges']
  }
</script>

<style>

</style>
