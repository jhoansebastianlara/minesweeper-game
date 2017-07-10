<template>
  <div class="credits">
    <a target="_blank" href="https://github.com/jhoansebastianlara/minesweeper-game">
      <img src="../../assets/icons/github.png" alt="">
    </a>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  .credits {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      cursor: pointer;
      width: 10em;
      background-color: white;
      height: 3em;
      // border: 1px solid red;
      border-radius: .25em;
      margin: 1em;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        height: 2em;
      }
    }
  }
</style>
