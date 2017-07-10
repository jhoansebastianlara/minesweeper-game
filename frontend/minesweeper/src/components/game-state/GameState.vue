<template>
  <div class="game-state">
    <div class="options">
      <a @click="$emit('openMenu')"><img src="../../assets/icons/menu.png" alt=""></a>
    </div>
    <div class="game-info-container">
      <div class="item">
        <div class="cell-minesweeper" @click="restartGame(null)">
        </div>
      </div>

      <div class="item">
        <div class="timer">
          <span>{{ game.time }}</span>
        </div>
      </div>

      <div class="item">
        <div class="flag-container"
             :class="{'flag-actived': flagPressed}"
             @click="switchFlagPressed">
        </div>
      </div>
    </div>
    <div class="options"></div>
  </div>
</template>

<script>
  import EventBus from '@/shared/EventBus'
  import {CONSTANTS} from '@/shared/constants'
  import authMixin from '@/mixins/authMixin'
  import gameMixin from '@/mixins/gameMixin'

  export default {
    name: 'game-status',

    data () {
      return {
        timer: null,
        time: 0
      }
    },

    watch: {
      time (time) {
        this.setTime(time)
      }
    },

    methods: {
      startTimer () {
        this.clearTimer()
        this.timer = setInterval(() => {
          this.time++
        }, 1000)
      },

      stopTimer () {
        if (this.timer) {
          clearInterval(this.timer)
        }
      },

      clearTimer () {
        this.stopTimer()
        this.time = 0
      }
    },

    created () {
      EventBus.$on(CONSTANTS.EVENTS.GAME_START, () => {
        this.startTimer()
      })

      EventBus.$on(CONSTANTS.EVENTS.RESET_GAME, () => {
        this.clearTimer()
      })

      EventBus.$on(CONSTANTS.EVENTS.GAME_FINISH, (status) => {
        this.stopTimer()
      })
    },

    mixins: [authMixin, gameMixin]
  }
</script>

<style lang="scss">
  @import "~styles";

  .game-state {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // flex-direction: column;
    background: color(blue-light-sky);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: $game-state-bar-height;
    width: 100%;
    z-index: 1;

    .options {
      width: 2em;

      a {
        margin: 0 .5em;
        img {
          width: 1em;
        }
      }
    }

    .game-info-container {
      display: flex;
      justify-content: space-around;
      width: 25em;
      height: 100%;
      max-width: 100%;

      .item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .cell-minesweeper {
        @extend .cell;
        min-width: $cell-size + .5;
        width: $cell-size + .5;
        height: $cell-size + .5;
        min-height: $cell-size + .5;

        &:after {
          border: 2px outset $cell-border-ouset-color;
          background-position: center center;
          background-size: 90%;
          background-repeat: no-repeat;
          background-image: url("../../assets/icons/smile-small.png");
        }

        &:active:after {
      		background: none;
      		border: none;
      		border-width: none;
          background-position: center center;
          background-size: 95%;
          background-repeat: no-repeat;
          background-image: url("../../assets/icons/face-cool.png");
      	}
      }

      .timer {
        display: flex;
        justify-content: center;
        align-items: center;
        background: black;
        padding: 0 1em;
        height: $cell-size;

        span {
          color: color(danger);
        }
      }

      .flag-container {
        border: 1px solid red;
        display: flex;
        justify-content: center;
        align-items: center;
        background: color(grays, medium);
        min-width: $cell-size + .5;
        width: $cell-size + .5;
        height: $cell-size + .5;
        min-height: $cell-size + .5;

        border: 2px outset $cell-border-ouset-color;
        background-position: center center;
        background-size: 50%;
        background-repeat: no-repeat;
        background-image: url("../../assets/icons/flag.png");
        -webkit-filter: grayscale(70%); /* Safari 6.0 - 9.0 */
        filter: grayscale(70%);

        &:active {
      		background: color(grays, light);
          background-position: center center;
          background-size: 50%;
          background-repeat: no-repeat;
          background-image: url("../../assets/icons/flag.png");
          -webkit-filter: none; /* Safari 6.0 - 9.0 */
          filter: none;
      	}
      }

      .flag-actived {
        background: color(grays, light);
        background-position: center center;
        background-size: 50%;
        background-repeat: no-repeat;
        background-image: url("../../assets/icons/flag.png");
        -webkit-filter: none; /* Safari 6.0 - 9.0 */
        filter: none;
      }
    }
  }
</style>
