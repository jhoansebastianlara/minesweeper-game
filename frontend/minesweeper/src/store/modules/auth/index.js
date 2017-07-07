import types from '@/store/types'

const state = {
  session: {
    authUser: null,
    // indicate if an users is logged or not
    userloggedIn: false
  }
}

const getters = {
  [types.auth.getters.getSession]: (state) => {
    return state.session
  }
}

const mutations = {
  [types.auth.mutations.setAuthUser]: (state, user) => {
    state.session.authUser = user
    state.session.userloggedIn = (user !== null)
  }
}

const actions = {
  [types.auth.actions.logIn]: ({commit}, {username}) => {
    return new Promise((resolve, reject) => {
      // set the authenticated user
      commit(types.auth.mutations.setAuthUser, username)
      resolve({success: true})
    })
  },

  [types.auth.actions.logOut]: ({commit}) => {
    return new Promise((resolve, reject) => {
      // destroy authenticated user
      commit(types.auth.mutations.setAuthUser, null)
      resolve({success: true})
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
