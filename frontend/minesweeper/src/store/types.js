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
      'getDirtyCells',
      'getMyGames',
      'getCurrentLevel'
    ],
    actions: [
      'createGame',
      'saveGame',
      'saveFinishedGame',
      'searchMyGames',
      'startGame',
      'restartGame',
      'revealCell',
      'gameOver',
      'doWinner'
    ],
    mutations: [
      'setGame',
      'setMyGames',
      'setCurrentLevel',
      'setGrid',
      'plantMine',
      'addAdjacentMine',
      'setRevealCell',
      'setTime',
      'setGameStatus'
    ]
  })
}
