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
    <div class="grid">
      <div class="row" v-for="(row, index) in grid" :key="index">
        <grid-cell v-for="(cell, jndex) in row"
                   :data="cell"
                   :revealed="true"
                   :key="cell.id">
        </grid-cell>
      </div>
    </div>

  </div>
</template>

<script>
  import GridCell from '@/components/game-grid/GridCell'
  import {MINESWEEPER} from '@/shared/constants'
  import EventBus from '@/shared/EventBus'

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
            this.updateAdjacentMinesNumInSurroundingCells(x, y)
            minesPlanted++
          }
        }
      },

      plantMine (x, y) {
        this.grid[x][y].hasMine = true
      },

      // This function is used to update the 'adjacentMinesNum' value of its surrounding cells
      updateAdjacentMinesNumInSurroundingCells (x, y) {
        let surroundingCellsPositions = this.getSurroundingCellsPositions(x, y)

        surroundingCellsPositions.forEach((position) => {
          this.updateAdjacentMinesCell(position.x, position.y)
        })
      },

      updateAdjacentMinesCell (x, y) {
        if (this.existsCell(x, y)) {
          this.grid[x][y].adjacentMinesNum++
        }
      },

      /**
      * Check if all surrounding cells didn't have mines, if yes then reveal
      * all hidden surrounding cells.
      */
      checkIfRevealSurroundingCells (x, y) {
        console.log('checkIfRevealSurroundingCells...', x, y)
        let surroundingCellsPositions = this.getSurroundingCellsPositions(x, y)
        let positionsLength = surroundingCellsPositions.length
        let shouldRevealSurrondingMines = true

        for (var i = 0; i < positionsLength && shouldRevealSurrondingMines; i++) {
          let position = surroundingCellsPositions[i]

          if (this.cellHasMine(position.x, position.y)) {
            shouldRevealSurrondingMines = false
            console.log('mine found...', position)
          }
        }

        console.log('shouldRevealSurrondingMines?', shouldRevealSurrondingMines)
        if (shouldRevealSurrondingMines) {
          console.log('reveal from: ', x, y)
          surroundingCellsPositions.forEach((position) => {
            console.log('revealing: ', position.x, position.y)
            EventBus.revealCell(position.x, position.y)
            // if (this.existsCell(position.x, position.y)) {
            //   this.grid[x][y].
            // }
          })
        }
      },

      existsCell (x, y) {
        return (this.grid[x] && this.grid[x][y])
      },

      cellHasMine (x, y) {
        let hasMine = false

        if (this.existsCell(x, y) && this.grid[x][y].hasMine) {
          hasMine = true
        }

        return hasMine
      },

      getSurroundingCellsPositions (x, y) {
        let surroundingPositions = [
          // cell up
          {x: x - 1, y},
          // cell down
          {x: x + 1, y},
          // cell left
          {x, y: y - 1},
          // cell right
          {x, y: y + 1},
          // cell upper right
          {x: x - 1, y: y + 1},
          // cell lower right
          {x: x + 1, y: y + 1},
          // cell lower left
          {x: x + 1, y: y - 1},
          // cell upper left
          {x: x - 1, y: y - 1}
        ]

        return surroundingPositions
      },

      getRandomNumber (max) {
        return Math.floor((Math.random() * 1000) + 1) % max
      }
    },

    created () {
      // executes when user clicks on a cell
      EventBus.$on('cellOpen', ({x, y}) => {
        console.log('cellOpen done', x, y)
        this.checkIfRevealSurroundingCells(x, y)
      })
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
