import Vue from 'vue'
import {CONSTANTS} from '@/shared/constants'

export default new Vue({
  methods: {
    cellRevealed (x, y) {
      this.$emit(CONSTANTS.EVENTS.CELL_REVEALED, {x, y})
    },

    revealCell (x, y) {
      let id = x + '-' + y
      let cellEventName = (CONSTANTS.EVENTS.REVEAL_CELL_BASE).replace('[ID]', id)
      this.$emit(cellEventName)
    },

    resetGame () {
      this.$emit(CONSTANTS.EVENTS.RESET_GAME)
    },

    gameStart () {
      this.$emit(CONSTANTS.EVENTS.GAME_START)
    },

    gameFinish (status) {
      this.$emit(CONSTANTS.EVENTS.GAME_FINISH)
    }
  }
})
