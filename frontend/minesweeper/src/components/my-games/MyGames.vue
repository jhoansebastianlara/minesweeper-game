<template>
  <div class="games">
    <div class="item-title">
      <h2 class="title">
        {{ $t('global.myGames') }}
      </h2>
    </div>

    <div class="item" v-if="!myGames.length">
      {{ $t('global.none') }}
    </div>

    <div class="game-item" v-for="game in myGames">
      <div class="level">
        <h3>{{ $t('game.grid') }}</h3>
        <span>{{ game.rows }} X {{ game.columns }}</span>
      </div>
      <div class="time">
        <h3>{{ $t('game.time') }}</h3>
        <span>{{ game.time }}</span>
      </div>
      <div class="status">
        <h3>{{ $t('game.status') }}</h3>
        <span v-if="game.status === 0">{{ $t('game.playing') }}</span>
        <span v-if="game.status === 1">{{ $t('game.pause') }}</span>
        <span v-if="game.status === 2">{{ $t('game.you_won') }}</span>
        <span v-if="game.status === 3">{{ $t('game.you_lost') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import gameMixin from '@/mixins/gameMixin'

  export default {
    name: 'my-games',

    mounted () {
      this.searchMyGames()
    },

    mixins: [gameMixin]
  }
</script>

<style lang="scss">
  @import "~styles";

  .games {

    .game-item {
      height: 3em;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      display: flex;
      justify-content: space-between;
      align-items: center;

      div {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        h3 {
          margin-bottom: .3em;
        }
      }

      span {
        color: color(grays, dark);
      }
    }
  }
</style>
