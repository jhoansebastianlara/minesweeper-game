<template>
  <div class="game-grid">
    <div class="grid">
      <div class="row" v-for="(row, index) in game.grid" :key="index">
        <grid-cell v-for="(cell, jndex) in row"
                   :data="cell"
                   :key="cell.id">
        </grid-cell>
      </div>
    </div>

    <div class="grid" v-if="debugging">
      <div class="row" v-for="(row, index) in game.grid" :key="index">
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
  import {CONSTANTS} from '@/shared/constants'
  import EventBus from '@/shared/EventBus'
  import gameMixin from '@/mixins/gameMixin'

  export default {
    name: 'game-grid',

    data () {
      return {
        // grid: null,
        debugging: false
      }
    },

    methods: {
      setup () {
        this.createGrid()
        this.plantMines()
      },

      createGrid () {
        let grid = []

        for (var x = 0; x < this.game.level.rowsNum; x++) {
          grid[x] = []

          for (var y = 0; y < this.game.level.colsNum; y++) {
            grid[x][y] = {
              x,
              y,
              id: x + '-' + y,
              hasMine: false,
              adjacentMinesNum: 0,
              isRevealed: false
            }
          }
        }

        this.setGrid(grid)
      },

      plantMines () {
        let minesPlanted = 0
        let x = 0
        let y = 0

        while (minesPlanted < this.game.level.minesNum) {
          x = this.getRandomNumber(this.game.level.rowsNum)
          y = this.getRandomNumber(this.game.level.colsNum)

          if (!this.game.grid[x][y].hasMine) {
            this.plantMine({x, y})
            // update adjacent cells
            this.updateAdjacentMinesNumInSurroundingCells(x, y)
            minesPlanted++
          }
        }
      },

      // This function is used to update the 'adjacentMinesNum' value of its surrounding cells
      updateAdjacentMinesNumInSurroundingCells (x, y) {
        let surroundingCellsPositions = this.getSurroundingCellsPositions(x, y)

        surroundingCellsPositions.forEach((position) => {
          if (this.existsCell(position.x, position.y)) {
            this.addAdjacentMine({x: position.x, y: position.y})
          }
        })
      },

      /**
      * Check if all surrounding cells didn't have mines, if yes then reveal
      * all hidden surrounding cells.
      */
      checkIfRevealSurroundingCells (x, y) {
        let surroundingCellsPositions = this.getSurroundingCellsPositions(x, y)
        let positionsLength = surroundingCellsPositions.length
        let shouldRevealSurrondingMines = true

        for (var i = 0; i < positionsLength && shouldRevealSurrondingMines; i++) {
          let position = surroundingCellsPositions[i]

          if (this.cellHasMine(position.x, position.y)) {
            shouldRevealSurrondingMines = false
          }
        }

        if (shouldRevealSurrondingMines) {
          surroundingCellsPositions.forEach((position) => {
            EventBus.revealCell(position.x, position.y)
          })
        }
      },

      existsCell (x, y) {
        return (this.game.grid[x] && this.game.grid[x][y])
      },

      cellHasMine (x, y) {
        let hasMine = false

        if (this.existsCell(x, y) && this.game.grid[x][y].hasMine) {
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

        // remove non-existent cells
        surroundingPositions = surroundingPositions.filter((position) => {
          return this.existsCell(position.x, position.y)
        })

        return surroundingPositions
      },

      getRandomNumber (max) {
        return Math.floor((Math.random() * 1000) + 1) % max
      }
    },

    created () {
      // executes when user clicks on a cell
      EventBus.$on(CONSTANTS.EVENTS.CELL_REVEALED, ({x, y}) => {
        if (!this.cellHasMine(x, y)) {
          this.checkIfRevealSurroundingCells(x, y)
        }
      })

      EventBus.$on(CONSTANTS.EVENTS.RESET_GAME, () => {
        this.setup()
      })
    },

    mounted () {
      this.setup()
      // debugging mode
      this.debugging = this.$route.query && this.$route.query.debugging
    },

    components: {
      GridCell
    },

    mixins: [gameMixin]
  }
</script>

<style lang="scss">
  @import "~styles";

  .game-grid {
    // padding-top: $game-state-bar-height + .5;
    display: flex;
    align-items: center;
    // height: 100%;
    width: 100%;

    .grid {
      display: inline-block;
      margin: 0 auto;

      .row {
        display: flex;
        justify-content: center;
        // font-size: 1.5rem;
      }
    }
  }
</style>
