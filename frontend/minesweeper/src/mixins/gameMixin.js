import { mapGetters, mapMutations, mapActions } from 'vuex'
import types from '@/store/types'

export default {
  data () {
    return {
      loading: false
    }
  },

  computed: {
    ...mapGetters({
      session: types.auth.getters.getSession,
      game: types.game.getters.getGame
    })
  },

  methods: {
    ...mapActions({
      saveGame: types.game.actions.saveGame,
      saveFinishedGame: types.game.actions.saveFinishedGame,
      startGame: types.game.actions.startGame,
      revealCell: types.game.actions.revealCell,
      gameOver: types.game.actions.gameOver,
      restartGame: types.game.actions.restartGame
    }),

    ...mapMutations({
      setGrid: types.game.mutations.setGrid,
      plantMine: types.game.mutations.plantMine,
      addAdjacentMine: types.game.mutations.addAdjacentMine,
      setTime: types.game.mutations.setTime
    })
  }
}
