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
  [types.auth.actions.login]: ({commit}, username) => {
    console.log('logIn...')
    return new Promise((resolve, reject) => {
      Vue.http.post(ENDPOINTS.USER.AUTH, {username})
        .then(response => {
          console.log('response: ', response)

          // validate the response status code is ok
          if (response.status === HTTP_STATUS.OK) {
            let data = response.body
            console.log('data: ', data)
            let token = data.token
            let userId = data.user ? data.user.id : null
            // set the authenticated user
            commit(types.auth.mutations.setAuthUser, {username, token, userId})
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

  [types.auth.actions.logout]: ({commit}) => {
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
