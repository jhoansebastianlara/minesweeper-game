<template>
  <div :class="classObject"
       @click="open">
    <span>{{ adjacentMinesNum }}</span>
  </div>
</template>

<script>
  export default {
    name: 'grid-cell',

    data () {
      return {
        isOpen: false,
        adjacentMinesNum: 1
      }
    },

    computed: {
      classObject () {
        let classes = {}

        if (this.isOpen) {
          classes['cell-open'] = true
          classes[this.numberClass] = true
        } else {
          classes['cell'] = true
        }

        return classes
      },

      numberClass () {
        let className

        switch (this.adjacentMinesNum) {
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
      open () {
        this.isOpen = true
      }
    }
  }
</script>

<style lang="scss">
  @import "~styles";

  .cell-open {
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid blue;
    min-width: 1.5em;
    width: 1.5em;
    height: 1.5em;
    min-height: 1.5em;
    background-color: red;
    position: relative;
    background: $cell-background-active-color;
    box-sizing: border-box;
    border: solid $cell-border-color;
    border-width: 0 1px 1px 0;

  }

  .cell {
    border: 1px solid #bbb;
    min-width: 1.5em;
    width: 1.5em;
    height: 1.5em;
    min-height: 1.5em;

    display: block;
    position: relative;
    background: $cell-background-color;
    box-sizing: border-box;
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

</style>
