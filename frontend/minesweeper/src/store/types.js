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
      'login',
      'logout'
    ],
    mutations: [
      'setAuthUser'
    ]
  }),

  game: namespace('game', {
    getters: [
      'getGame',
      'getDirtyCells'
    ],
    actions: [
      'createGame',
      'saveGame',
      'saveFinishedGame',
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
