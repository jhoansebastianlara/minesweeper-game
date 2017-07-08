/**
* Allows collaborators to get an at-a-glance view of what mutations, getters
* and actions are possible in the entire application.
*/

import namespace from './namespace'

export default {
  auth: namespace('auth', {
    getters: [
      'getSession'
    ],
    actions: [
      'logIn',
      'logOut'
    ],
    mutations: [
      'setAuthUser'
    ]
  }),

  game: namespace('game', {
    getters: [
      'getGame'
    ],
    actions: [
      'startGame',
      'restartGame',
      'revealCell',
      'gameOver',
      'doWinner'
    ],
    mutations: [
      'setGame',
      'setGrid',
      'plantMine',
      'addAdjacentMine',
      'setRevealCell',
      'setTime',
      'setGameStatus'
    ]
  })
}
