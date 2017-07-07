import Vue from 'vue'

export default new Vue({
  methods: {
    cellOpen (x, y) {
      this.$emit('cellOpen', {x, y})
    },

    revealCell (x, y) {
      let cellEventName = 'revealCell-' + x + '-' + y
      console.log('emit: ', cellEventName)
      this.$emit(cellEventName)
    }
  }
})
