import Vue from 'vue'
import {
  ENDPOINTS,
  HTTP_STATUS,
  ERROR_CODES,
  LOCAL_STORAGE
} from '@/shared/constants'
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
  [types.auth.mutations.setAuthUser]: (state, data) => {
    state.session.authUser = data
    state.session.userloggedIn = (data !== null)

    if (data && data.token) {
      localStorage.setItem(LOCAL_STORAGE.AUTH_USER, JSON.stringify(data))
    } else {
      localStorage.removeItem(LOCAL_STORAGE.AUTH_USER)
    }
  }
}

const actions = {
  [types.auth.actions.login]: ({rootState, commit}, username) => {
    return new Promise((resolve, reject) => {
      Vue.http.post(ENDPOINTS.USER.AUTH, {username})
        .then(response => {
          // validate the response status code is ok
          if (response.status === HTTP_STATUS.OK) {
            let data = response.body
            let token = data.token
            let userId = data.user ? data.user.id : null
            let games = data.user ? data.user.games : []
            // set the authenticated user
            commit(types.auth.mutations.setAuthUser, {username, token, userId})
            // set my games
            rootState.game.myGames = games
            resolve({success: true})
          } else {
            resolve({
              success: false,
              error: ERROR_CODES.INTERNAL_ERROR
            })
          }
        }, response => {
          // error callback
          reject({
            success: false,
            error: ERROR_CODES.INTERNAL_ERROR
          })
        })
    })
  },

  [types.auth.actions.logout]: ({rootState, commit}) => {
    return new Promise((resolve, reject) => {
      // destroy authenticated user
      commit(types.auth.mutations.setAuthUser, null)
      // remove user games
      rootState.game.myGames = []
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
