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
    }
  }
})
