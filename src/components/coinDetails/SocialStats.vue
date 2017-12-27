<template>
<div>
  <div>
    <a :href="Facebook.link" target="_blank"><i class="fa fa-facebook-official" aria-hidden="true" title="Facebook.name"></i>Facebook</a>
  </div>
</div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {

    created() {
      this.fetchCoinSocialStats(this.coin);
    },

    computed: {
      ...mapGetters(['coinSocialStats']),

      Twitter() {
        return this.coinSocialStats.Data.Twitter;
      },

      Reddit() {
        return this.coinSocialStats.Data.Reddit;
      },

      Facebook() {
        return this.coinSocialStats.Data.Facebook;
      },

      Repository() {
        return this.coinSocialStats.Data.CodeRepository;
      }
    },

    methods: {
      ...mapActions(['fetchCoinSocialStats'])
    },

    props: ['coin']

  }
</script>
