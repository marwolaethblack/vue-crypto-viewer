<template>
  <div id="app">
      <app-header></app-header>
      <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/layout/Header.vue';

  export default {
    name: 'app',
    components: {
      'app-header': Header
    },
  }
</script>

<style>
</style>
