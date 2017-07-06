<template>
  <div class="game-grid">
    <!-- <pre>{{ level }}</pre> -->

    <div class="grid">
      <div class="row" v-for="(row, index) in grid" :key="index">
        <grid-cell v-for="(cell, jndex) in row" :key="cell.id">
        </grid-cell>
      </div>
    </div>

  </div>
</template>

<script>
  import GridCell from '@/components/game-grid/GridCell'
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
              y,
              id: x + '-' + y
            }
          }
        }
      }
    },

    mounted () {
      this.createGrid()
    },

    components: {
      GridCell
    }
  }
</script>

<style lang="scss">
  @import "~styles";

  .game-grid {
    margin-top: $game-state-bar-height;
    display: flex;

    .grid {
      display: inline-block;
      margin: 0 auto;

      .row {
        display: flex;
        justify-content: center;
        font-size: 1.5rem;
      }
    }
  }
</style>
