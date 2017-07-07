import { mapGetters, mapMutations, mapActions } from 'vuex'
import types from '@/store/types'

export default {
  computed: {
    ...mapGetters({
      game: types.game.getters.getGame
    })
  },

  methods: {
    ...mapActions({
      startGame: types.game.actions.startGame,
      revealCell: types.game.actions.revealCell,
      gameOver: types.game.actions.gameOver
    }),

    ...mapMutations({
      setGrid: types.game.mutations.setGrid,
      plantMine: types.game.mutations.plantMine,
      addAdjacentMine: types.game.mutations.addAdjacentMine
    })
  }
}
