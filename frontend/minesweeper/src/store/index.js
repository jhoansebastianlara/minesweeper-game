import Vue from 'vue'
import Vuex from 'vuex'

// modules
import auth from '@/store/modules/auth'
import game from '@/store/modules/game'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    game
  }
})
