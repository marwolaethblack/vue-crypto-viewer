<template>
  <div>
  </div>

</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {

    created() {
      const { coin } = this.$route.params;
      this.changeCoinDetails(coin);
    },

    computed: {
      ...mapGetters(['coinDetails'])
    },

    methods: {
      ...mapActions(['changeCoinDetails'])
    }
  }
</script>

<style>

</style>
