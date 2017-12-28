<template>
<div>
  <div v-if="isCoinSocialStatsLoading"></div>
  <div v-else>
    <a :href="Facebook.link" target="_blank">
      <span class="icon">
        <i class="fa fa-facebook-official" aria-hidden="true" title="Facebook.name"></i>
      </span>Facebook
    </a>
    <a :href="Twitter.link" target="_blank">
      <span class="icon">
        <i class="fa fa-twitter" aria-hidden="true" title="Twitter.name"></i>
      </span>Twitter
    </a>
    <a :href="Reddit.link" target="_blank">
      <span class="icon">
        <i class="fa fa-reddit" aria-hidden="true" title="Reddit.name"></i>
      </span>Reddit
    </a>
    <div class="content" v-if="Repository.length">
      <span class="icon">
        <i class="fa fa-github" aria-hidden="true"></i>
      </span>
      Repositories
      <ul>
        <li v-for="repo in Repository">
          <a :href="repo.url" target="_blank">{{ repo.language }}</a>
        </li>
      </ul>
    </div>
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
      ...mapGetters(['coinSocialStats', 'loading']),

      isCoinSocialStatsLoading() {
        if(this.loading.length != 0) {
          return this.loading.indexOf('coinSocialStats') === -1 ? false : true;
        }
      },

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
        return this.coinSocialStats.Data.CodeRepository.List;
      }
    },

    methods: {
      ...mapActions(['fetchCoinSocialStats'])
    },

    props: ['coin']

  }
</script>
