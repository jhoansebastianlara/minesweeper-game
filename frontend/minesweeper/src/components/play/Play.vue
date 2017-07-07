<template>
  <div class="">
    <game-state></game-state>
    <game-grid :level="currentGame.level"></game-grid>
  </div>
</template>

<script>
  import GameState from '@/components/game-state/GameState'
  import GameGrid from '@/components/game-grid/GameGrid'
  import {MINESWEEPER} from '@/shared/constants'

  export default {
    name: 'play',

    data () {
      return {
        currentGame: {
          level: MINESWEEPER.LEVELS.MEDIUM,
          status: MINESWEEPER.GAME.STATUS.READY_TO_PLAY,
          flagsNum: 0,
          cellsOpenNum: 0,
          time: 0
        }
      }
    },

    components: {
      GameState,
      GameGrid
    }
  }
</script>

<style lang="css">
</style>
