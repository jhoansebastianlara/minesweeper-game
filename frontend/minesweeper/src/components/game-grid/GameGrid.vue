<template>
  <div class="game-grid">
    <!-- <pre>{{ level }}</pre> -->

    <div class="grid">
      <div class="row" v-for="row in grid">
        <div class="cell" v-for="cell in row">
          x
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {MINESWEEPER} from '@/shared/constants'

  export default {
    name: 'game-grid',

    props: {
      level: {
        type: Object,
        default: () => {
          return MINESWEEPER.LEVELS.EASY
        }
      }
    },

    data () {
      return {
        grid: null
      }
    },

    methods: {
      createGrid () {
        this.grid = []
        console.log(this.level.rowsNum)
        for (var x = 0; x < this.level.rowsNum; x++) {
          this.grid[x] = []

          for (var y = 0; y < this.level.colsNum; y++) {
            this.grid[x][y] = {
              x,
              y
            }
          }
        }
      }
    },

    mounted () {
      this.createGrid()
    }
  }
</script>

<style lang="scss">
  @import "~styles";

  .game-grid {
    margin-top: $game-state-bar-height;
    display: flex;

    .grid {
      // border: 1px solid red;
      display: inline-block;
      margin: 0 auto;

      .row {
        display: flex;
        justify-content: center;
        font-size: 1.8rem;

        .cell {
          border: 1px solid #bbb;
          min-width: 1.5em;
          width: 1.5em;
          height: 1.5em;
          min-height: 1.5em;
          text-align: center;
          vertical-align: middle;
        }
      }
    }
  }
</style>
