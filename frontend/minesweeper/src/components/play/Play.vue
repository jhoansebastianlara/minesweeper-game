<template>
  <div class="play">
    <auth v-show="showAuthModal" @close="showAuthModal = false"></auth>
    <side-menu v-show="showSideMenu"
               @close="showSideMenu = false"
               @login="showAuthModal = true; showSideMenu = true">
    </side-menu>

    <game-state @openMenu="showSideMenu = true"></game-state>

    <game-grid></game-grid>

    gameId: {{ game.gameId }}

    <transition name="fade">
      <div class="game-finished" v-show="showGameOver || showWinner">
        <span class="game-over" v-show="showGameOver">{{ $t('game.game_over') }}</span>
        <span class="you-won" v-show="showWinner">{{ $t('game.you_win') }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
  import authMixin from '@/mixins/authMixin'
  import gameMixin from '@/mixins/gameMixin'
  import EventBus from '@/shared/EventBus'
  import {MINESWEEPER, LOCAL_STORAGE} from '@/shared/constants'
  // components
  import SideMenu from '@/components/side-menu/SideMenu'
  import GameState from '@/components/game-state/GameState'
  import GameGrid from '@/components/game-grid/GameGrid'
  import Auth from '@/components/auth/Auth'

  export default {
    name: 'play',

    data () {
      return {
        showWinner: false,
        showGameOver: false,
        showSideMenu: false,
        showAuthModal: false
      }
    },

    watch: {
      'game.status' (newStatus) {
        switch (newStatus) {
          case MINESWEEPER.GAME.STATUS.PLAYING:
            EventBus.gameStart()
            break

          case MINESWEEPER.GAME.STATUS.GAME_OVER:
            this.showGameOver = true
            EventBus.gameFinish(MINESWEEPER.GAME.STATUS.GAME_OVER)
            break

          case MINESWEEPER.GAME.STATUS.WINNER:
            this.showWinner = true
            EventBus.gameFinish(MINESWEEPER.GAME.STATUS.WINNER)
            break

          default:
            this.showGameOver = false
            this.showWinner = false
        }
      }
    },

    mounted () {
      let authUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE.AUTH_USER))

      // check if some user is logged in
      if (authUser && authUser.token) {
        this.setAuthUser(authUser)
      }
    },

    components: {
      SideMenu,
      GameState,
      GameGrid,
      Auth
    },

    mixins: [authMixin, gameMixin]
  }
</script>

<style lang="scss">
  @import "~styles";

  .play {
    height: 100%;
    font-size: 1.8rem;
  }

  .auth-container {
    margin-top: $game-state-bar-height;
    height: 1.8em;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      font-size: 1.5rem;
    }
  }

  .game-finished {
    position: fixed;
    top: $game-state-bar-height;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, .4);

    span {
      font-weight: bold;
      font-size: 5rem;
      opacity: .75;
      max-width: 100%;
      width: 30em;
      text-align: center;
      word-break:keep-all;
      padding-bottom: 2em;
    }

    .game-over {
      color: color(danger);
      text-shadow: 0px 0px 30px rgba(255, 0, 23, 1);
    }

    .you-won {
      color: color(success);
      text-shadow: 0px 0px 30px rgba(1, 197, 1, 1);
      opacity: 1;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>
