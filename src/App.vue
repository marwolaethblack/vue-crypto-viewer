<template>
  <div id="app">
      <app-header></app-header>
      <router-view class="container"></router-view>
  </div>
</template>

<script>
  import Header from './components/layout/Header/Header.vue';

  export default {
    name: 'app',
    components: {
      'app-header': Header
    },
  }
</script>

<style>
</style>
