<template>
  <div class="levels">
    <div class="item-title">
      <h2 class="title">
        {{ $t('game.level') }}
      </h2>
    </div>
    <div class="item" :class="{'active-level': currentLevel === level.data}"
         v-for="level in levels"
         @click="selectLevel(level.data)">
      <span class="truncate-text">
        {{ level.name }} -
        ({{ level.data.rowsNum + ' X ' + level.data.colsNum}})
      </span>
    </div>
  </div>
</template>

<script>
  import {MINESWEEPER} from '@/shared/constants'
  import gameMixin from '@/mixins/gameMixin'

  export default {
    name: 'levels',

    data () {
      return {
        levels: [
          {
            name: this.$t('game.easy'),
            data: MINESWEEPER.LEVELS.EASY
          }, {
            name: this.$t('game.medium'),
            data: MINESWEEPER.LEVELS.MEDIUM
          }, {
            name: this.$t('game.hard'),
            data: MINESWEEPER.LEVELS.HARD
          }
        ]
      }
    },

    methods: {
      selectLevel (level) {
        this.restartGame(level)
      }
    },

    mixins: [gameMixin]
  }
</script>

<style lang="scss">
  @import "~styles";

  .active-level {
    background-color: color(grays, light);
  }
</style>
