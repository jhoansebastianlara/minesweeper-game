<template>
  <div class="play">
    <game-state></game-state>
    <game-grid></game-grid>

    <transition name="fade">
      <div class="game-finished" v-show="showGameOver || showWinner">
        <span class="game-over" v-show="showGameOver">{{ $t('game.game_over') }}</span>
        <span class="you-won" v-show="showWinner">{{ $t('game.you_won') }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
  import gameMixin from '@/mixins/gameMixin'
  import EventBus from '@/shared/EventBus'
  import {MINESWEEPER} from '@/shared/constants'
  // components
  import GameState from '@/components/game-state/GameState'
  import GameGrid from '@/components/game-grid/GameGrid'

  export default {
    name: 'play',

    data () {
      return {
        showWinner: false,
        showGameOver: false
      }
    },

    watch: {
      'game.status' (newStatus) {
        console.log('newStatus: ', newStatus)
        switch (newStatus) {
          case MINESWEEPER.GAME.STATUS.PLAYING:
            EventBus.gameStart()
            break

          case MINESWEEPER.GAME.STATUS.GAME_OVER:
            this.showGameOver = true
            EventBus.gameFinish()
            break

          case MINESWEEPER.GAME.STATUS.WINNER:
            this.showWinner = true
            EventBus.gameFinish()
            break

          default:
            this.showGameOver = false
            this.showWinner = false
        }
      }
    },

    components: {
      GameState,
      GameGrid
    },

    mixins: [gameMixin]
  }
</script>

<style lang="scss">
  @import "~styles";

  .game-finished {
    position: fixed;
    top: $game-state-bar-height;
    right: 0;
    bottom: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;

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
