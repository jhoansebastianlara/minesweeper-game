import {ENDPOINTS, HTTP_STATUS, ERROR_CODES} from '@/shared/constants'
import types from '@/store/types'
import Vue from 'vue'

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
  [types.auth.actions.login]: ({commit}, username) => {
    console.log('logIn...')
    return new Promise((resolve, reject) => {
      // Vue.http.get(ENDPOINTS.GAMES.ROOT)
      //   .then(response => {
      //     console.log('response: ', response)
      //
      //     // validate the response status code is ok
      //     if (response.status === HTTP_STATUS.OK) {
      //       let data = response.body
      //       console.log('data: ', data)
      //
      //       resolve({success: true})
      //     } else {
      //       resolve({
      //         success: false,
      //         error: ERROR_CODES.INTERNAL_ERROR
      //       })
      //     }
      //   }, response => {
      //     // error callback
      //     reject({
      //       success: false,
      //       error: ERROR_CODES.INTERNAL_ERROR
      //     })
      //   })
      Vue.http.post(ENDPOINTS.USER.AUTH, {username})
        .then(response => {
          console.log('response: ', response)

          // validate the response status code is ok
          if (response.status === HTTP_STATUS.OK) {
            let data = response.body
            console.log('data: ', data)
            // set the authenticated user
            commit(types.auth.mutations.setAuthUser, username)
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
    console.log('logout...')
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
