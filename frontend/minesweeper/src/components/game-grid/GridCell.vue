<template>
  <div :class="classObject"
       @click="reveal">
    <span v-if="!data.hasMine">{{ data.adjacentMinesNum || '' }}</span>
  </div>
</template>

<script>
  import EventBus from '@/shared/EventBus'
  import {CONSTANTS} from '@/shared/constants'

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
        isRevealed: false
      }
    },

    computed: {
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

    methods: {
      reveal () {
        this.isRevealed = true
        EventBus.cellRevealed(this.data.x, this.data.y)
      }
    },

    created () {
      let cellEventName = (CONSTANTS.EVENTS.REVEAL_CELL_BASE).replace('[ID]', this.data.id)
      // called to when revealing cells automatically
      EventBus.$on(cellEventName, () => {
        if (!this.isRevealed) {
          this.isRevealed = true
          EventBus.cellRevealed(this.data.x, this.data.y)
        }
      })
    }
  }
</script>

<style lang="scss">
  @import "~styles";

  ._cell {
    min-width: $cell-size;
    width: $cell-size;
    height: $cell-size;
    min-height: $cell-size;
    position: relative;
    box-sizing: border-box;
  }

  .cell-revealed {
    @extend ._cell;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $cell-background-active-color;
    border: solid $cell-border-active-color;
    border-width: 0 1px 1px 0;
  }

  .cell {
    @extend ._cell;
    background: $cell-background-color;
    border: solid $cell-border-color;
    border-width: 0 1px 1px 0;

    overflow: hidden;
    cursor: pointer;
    pointer-events: none;

    &:after {
      content: '';
      position: absolute;
      left: 0; top: 0;
      width: 100%; height: 100%;
      box-sizing: border-box;
      background: $cell-background-color;
      border: 3px outset $cell-border-ouset-color;
      font-size: .75rem;
      text-align: center;
      pointer-events: auto;
    }

    &:active:after {
      background: $cell-background-active-color;
      border: solid $cell-border-active-color;
      border-width: 2px 0 0 2px;
    }
  }

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
