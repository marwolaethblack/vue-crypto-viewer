<template>
  <div id="app">
      <app-header></app-header>
      <router-view class="container view"></router-view>
      <app-Footer></app-Footer>
  </div>
</template>

<script>
  import Header from './components/layout/Header/Header.vue';
  import Footer from './components/layout/Footer/Footer.vue';

  export default {
    name: 'app',
    components: {
      'app-header': Header,
      'app-Footer': Footer
    },
  }
</script>

<style>
  .container.view {
    min-height: 80vh;
  }

</style>
