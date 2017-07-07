<template>
  <div class="game-grid">
    <!-- <pre>{{ grid }}</pre> -->

    <div class="grid">
      <div class="row" v-for="(row, index) in grid" :key="index">
        <grid-cell v-for="(cell, jndex) in row"
                   :data="cell"
                   :key="cell.id">
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

        for (var x = 0; x < this.level.rowsNum; x++) {
          this.grid[x] = []

          for (var y = 0; y < this.level.colsNum; y++) {
            this.grid[x][y] = {
              x,
              y,
              id: x + '-' + y,
              hasMine: false,
              adjacentMinesNum: 0
            }
          }
        }
      },

      plantMines () {
        let minesPlanted = 0
        let x = 0
        let y = 0

        while (minesPlanted < this.level.minesNum) {
          x = this.getRandomNumber(this.level.rowsNum)
          y = this.getRandomNumber(this.level.colsNum)

          if (!this.grid[x][y].hasMine) {
            this.plantMine(x, y)
            // update adjacent cells
            this.updateAdjacentMinesNumInNeighboringCells(x, y)
            minesPlanted++
          }
        }
      },

      plantMine (x, y) {
        this.grid[x][y].hasMine = true
      },

      // This function is used to update the 'adjacentMinesNum' value of its neighboring cells
      updateAdjacentMinesNumInNeighboringCells (x, y) {
        // cell up
        this.updateAdjacentMinesCell(x - 1, y)
        // cell down
        this.updateAdjacentMinesCell(x + 1, y)
        // cell left
        this.updateAdjacentMinesCell(x, y - 1)
        // cell right
        this.updateAdjacentMinesCell(x, y + 1)
        // cell upper right
        this.updateAdjacentMinesCell(x - 1, y + 1)
        // cell lower right
        this.updateAdjacentMinesCell(x + 1, y + 1)
        // cell lower left
        this.updateAdjacentMinesCell(x + 1, y - 1)
        // cell upper left
        this.updateAdjacentMinesCell(x - 1, y - 1)
      },

      updateAdjacentMinesCell (x, y) {
        if (this.grid[x] && this.grid[x][y]) {
          this.grid[x][y].adjacentMinesNum++
        }
      },

      getRandomNumber (max) {
        return Math.floor((Math.random() * 1000) + 1) % max
      }
    },

    mounted () {
      this.createGrid()
      this.plantMines()
    },

    components: {
      GridCell
    }
  }
</script>

<style lang="scss">
  @import "~styles";

  .game-grid {
    margin-top: $game-state-bar-height + .2;
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
