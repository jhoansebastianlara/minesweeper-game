import { mapGetters, mapMutations, mapActions } from 'vuex'
import types from '@/store/types'

export default {
  computed: {
    ...mapGetters({
      session: types.auth.getters.getSession
    })
  },

  methods: {
    ...mapActions({
      login: types.auth.actions.login,
      logout: types.auth.actions.logout
    }),

    ...mapMutations({
      setAuthUser: types.auth.mutations.setAuthUser
    })
  }
}
