<template>
  <div class="page-not-found">
    <h1>{{ $t('global.pageNotFound') }}</h1>
    <button type="button" @click="goToHome">{{ $t('global.goToPlay') }}</button>
  </div>
</template>

<script>
export default {
  name: 'not-data-found',
  data () {
    return {
    }
  },

  methods: {
    goToHome () {
      this.$router.replace({name: 'play'})
    }
  }
}
</script>

<style lang="scss">
  @import "~styles";

  .page-not-found {
    margin-top: 2em;
    height: 4em;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    // text-align: center;

    button {
      width: 10em;
      margin-top: 1em;
    }
  }
</style>
