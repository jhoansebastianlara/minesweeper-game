<template>
  <div class="side-menu">
    <div class="item-top">
      <h1 class="truncate-text">Minesweeper VueJS</h1>
      <a class="close" @click="$emit('close')">
        <img src="../../assets/icons/close-white.png" alt="">
      </a>
    </div>

    <div class="item">
      <a v-if="!session.userloggedIn"
         class="option"
         @click="$emit('login')">
        {{ $t('global.login') }}
      </a>
      <span v-else class="truncate-text">{{ session.authUser.username }}</span>
    </div>

    <div v-if="session.userloggedIn" class="item">
      <a @click="doLogout" class="option">
        {{ $t('global.logout') }}
      </a>
    </div>

  </div>
</template>

<script>
  import authMixin from '@/mixins/authMixin'

  export default {
    methods: {
      doLogout () {
        this.logout()
      }
    },

    mixins: [authMixin]
  }
</script>

<style lang="scss">
  @import "~styles";

  .side-menu {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 20em;
    max-width: 90%;
    background: white;
    z-index: 2;
    font-size: 1.2rem;
    border-right: 1px solid rgba(0, 0, 0, .5);

    .item-top {
      @extend .item;
      background: color(primary);
      display: flex;
      justify-content: space-between;

      h1 {
        color: white;
        font-size: 1.4rem;
      }

      .close {
        img {
          width: 2em;
        }
      }
    }

    .item {
      // border: 1px solid blue;
      height: 3em;
      display: flex;
      align-items: center;
      padding: 0 .5em;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      font-size: 1rem;

      .option {
        width: 100%;
      }
    }
  }
</style>
