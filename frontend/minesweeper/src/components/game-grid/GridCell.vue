<template>
  <div :class="classObject"
       @click="reveal">
    <span v-if="!data.hasMine">{{ data.adjacentMinesNum || '' }}</span>
  </div>
</template>

<script>
  import EventBus from '@/shared/EventBus'
  import {CONSTANTS, MINESWEEPER} from '@/shared/constants'
  import gameMixin from '@/mixins/gameMixin'

  export default {
    name: 'grid-cell',

    props: {
      data: {
        type: Object,
        required: true
      },

      // debug purposes
      revealed: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
      }
    },

    computed: {
      isRevealed () {
        return this.game.grid[this.data.x][this.data.y].isRevealed
      },

      isPlaying () {
        let playing = this.game.status === MINESWEEPER.GAME.STATUS.PLAYING
        let ready = this.game.status === MINESWEEPER.GAME.STATUS.READY_TO_PLAY

        return (playing || ready)
      },

      classObject () {
        let classes = {}

        if (this.isRevealed || this.revealed) {
          classes['cell-revealed'] = true
          classes[this.numberClass] = true

          if (this.data.hasMine) {
            classes['hasMine'] = true
          }
        } else {
          classes['cell'] = true
        }

        return classes
      },

      numberClass () {
        let className

        switch (this.data.adjacentMinesNum) {
          case 1:
            className = 'one'
            break
          case 2:
            className = 'two'
            break
          case 3:
            className = 'three'
            break
          case 4:
            className = 'four'
            break
          case 5:
            className = 'five'
            break
          case 6:
            className = 'six'
            break
          case 7:
            className = 'seven'
            break
          case 8:
            className = 'eight'
            break
          default:
            className = 'empty'
        }

        return className
      }
    },

    watch: {
      isRevealed (revealed) {
        if (revealed) {
          EventBus.cellRevealed(this.data.x, this.data.y)
        }
      }
    },

    methods: {
      reveal () {
        if (this.isPlaying) {
          this.revealCell({cell: this.data, automatically: false})
        }
      }
    },

    created () {
      let cellEventName = (CONSTANTS.EVENTS.REVEAL_CELL_BASE).replace('[ID]', this.data.id)
      // called to when revealing cells automatically
      EventBus.$on(cellEventName, () => {
        if (!this.isRevealed) {
          this.revealCell({cell: this.data, automatically: true})
        }
      })
    },

    mixins: [gameMixin]
  }
</script>

<style lang="scss">
  @import "~styles";

  // Numbers
  .one {
    color: blue;
  }

  .two {
    color: green;
  }

  .three {
    color: red;
  }

  .four {
    color: #2b4b65;
  }

  .five {
    color: #4f2702;
  }

  .six {
    color: #0b615e;
  }

  .seven {
    color: black;
  }

  .eight {
    color: #666;
  }

  // Mines
  .hasMine {
    background-position: center center;
    background-size: 80%;
    background-repeat: no-repeat;
    background-image: url("../../assets/icons/mine.png");
    // background-color: black;
  }

</style>
