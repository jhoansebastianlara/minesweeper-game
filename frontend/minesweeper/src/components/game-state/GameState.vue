<template>
  <div class="game-state">
    top
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  @import "~styles";

  .game-state {
    background: color(grays, medium);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: $game-state-bar-height;
    width: 100%;
    // border: 2px solid purple;
  }
</style>
