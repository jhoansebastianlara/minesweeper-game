import Vue from 'vue'
import types from '@/store/types'
import {
  MINESWEEPER,
  INITIAL_GAME_STATE,
  ENDPOINTS,
  HTTP_STATUS,
  ERROR_CODES
} from '@/shared/constants'
import utils from '@/shared/utils'
import EventBus from '@/shared/EventBus'

// format an array to string and replace necessary string to send to the api
let formatToString = (cells) => {
  // convert to string
  let cellsString = JSON.stringify(cells)

  // format the string to send
  cellsString = utils.replaceAll(cellsString, 'false', '0')
  cellsString = utils.replaceAll(cellsString, 'true', '1')
  cellsString = utils.replaceAll(cellsString, 'hasMine', 'has_mine')
  cellsString = utils.replaceAll(cellsString, 'isRevealed', 'pressed')

  return cellsString
}

const state = {
  game: INITIAL_GAME_STATE(),
  myGames: [],
  currentLevel: INITIAL_GAME_STATE().level,
  flagPressed: false
}

const getters = {
  [types.game.getters.getGame]: (state) => {
    return state.game
  },

  [types.game.getters.getDirtyCells]: (state) => {
    let dirtyCells = []

    state.game.grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.isRevealed) {
          dirtyCells.push(cell)
        }
      })
    })

    return dirtyCells
  },

  [types.game.getters.getMyGames]: (state) => {
    return state.myGames
  },

  [types.game.getters.getCurrentLevel]: (state) => {
    return state.currentLevel
  },

  [types.game.getters.getFlagPressed]: (state) => {
    return state.flagPressed
  }
}

const mutations = {
  [types.game.mutations.setGame]: (state, newGame) => {
    state.game.status = MINESWEEPER.GAME.STATUS.READY_TO_PLAY
    state.game = newGame
  },

  [types.game.mutations.setMyGames]: (state, myGames) => {
    state.myGames = myGames
  },

  [types.game.mutations.setCurrentLevel]: (state, newLevel) => {
    state.currentLevel = newLevel
  },

  [types.game.mutations.setGrid]: (state, newGrid) => {
    state.game.grid = newGrid
  },

  [types.game.mutations.plantMine]: (state, {x, y}) => {
    state.game.grid[x][y].hasMine = true
  },

  [types.game.mutations.addAdjacentMine]: (state, {x, y}) => {
    state.game.grid[x][y].adjacentMinesNum++
  },

  [types.game.mutations.setRevealCell]: (state, {cell, automatically}) => {
    if (!state.game.grid[cell.x][cell.y].isRevealed) {
      state.game.cellsRevealedNum++
    }

    state.game.grid[cell.x][cell.y].isRevealed = true

    if (!automatically) {
      state.game.moves++
    }
  },

  [types.game.mutations.setTime]: (state, time) => {
    state.game.time = time
  },

  [types.game.mutations.setGameStatus]: (state, newStatus) => {
    state.game.status = newStatus
  },

  [types.game.mutations.switchFlagPressed]: (state) => {
    state.flagPressed = !state.flagPressed
  }
}

const actions = {
  [types.game.actions.saveGame]: ({rootState, getters, dispatch, state, commit}) => {
    return new Promise((resolve, reject) => {
      if (!state.game.gameId) return resolve({success: false})

      let dirtyCells = getters[types.game.getters.getDirtyCells]
      let cells = formatToString(dirtyCells)

      let endpoint = ENDPOINTS.GAMES.CELLS.replace(':id', state.game.gameId)
      let params = {
        time: state.game.time,
        score: state.game.score,
        cells
      }

      Vue.http.put(endpoint, params)
        .then(response => {
          // validate the response status code is ok
          if (response.status === HTTP_STATUS.OK) {
            let data = response.body

            // save the game if some user is logged in
            if (rootState.auth.session.userloggedIn) {
              let gameOver = state.game.status === MINESWEEPER.GAME.STATUS.GAME_OVER
              let winner = state.game.status === MINESWEEPER.GAME.STATUS.WINNER
              if (gameOver || winner) {
                dispatch(types.game.actions.saveFinishedGame)
                  .then(response => {
                    // keep update the games when the current game
                    if (response.success) {
                      dispatch(types.game.actions.searchMyGames)
                    }
                  })
              }
            }

            resolve({success: true, data})
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

  [types.game.actions.createGame]: ({state, commit}) => {
    return new Promise((resolve, reject) => {
      let cells = formatToString(state.game.grid)

      let params = {
        rows: state.game.level.rowsNum,
        columns: state.game.level.colsNum,
        cells
      }

      Vue.http.post(ENDPOINTS.GAMES.ROOT, params)
        .then(response => {
          // validate the response status code is ok
          if (response.status === HTTP_STATUS.OK) {
            let data = response.body

            if (data && data.game) {
              // update gameId
              state.game.gameId = data.game.id

              let cells = data.game.cells
              // update cells ids
              cells.forEach((cell) => {
                state.game.grid[cell.x][cell.y].id = cell.id
              })

              resolve({success: true, data})
            } else {
              resolve({success: false, data})
            }
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

  [types.game.actions.saveFinishedGame]: ({state, commit}) => {
    return new Promise((resolve, reject) => {
      Vue.http.put(ENDPOINTS.GAMES.DETAIL.replace(':id', state.game.gameId), {status: state.game.status})
        .then(response => {
          // validate the response status code is ok
          if (response.status === HTTP_STATUS.OK) {
            let data = response.body
            resolve({success: true, data})
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

  [types.game.actions.searchMyGames]: ({state, commit}) => {
    return new Promise((resolve, reject) => {
      Vue.http.get(ENDPOINTS.GAMES.ROOT)
        .then(response => {
          // validate the response status code is ok
          if (response.status === HTTP_STATUS.OK) {
            let data = response.body
            commit(types.game.mutations.setMyGames, data.games)
            resolve({success: false, data})
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

  [types.game.actions.startGame]: ({rootState, state, commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(types.game.mutations.setGameStatus, MINESWEEPER.GAME.STATUS.PLAYING)

      // save the game if some user is logged in
      if (rootState.auth.session.userloggedIn) {
        // save the game
        dispatch(types.game.actions.createGame)
          .then(response => {
            if (response.success) {
              // save the game, when create it every cell has isRevealed: false
              dispatch(types.game.actions.saveGame)
            }
            resolve({success: true, shouldSave: true})
          }, error => {
            resolve({success: false, shouldSave: true, error})
          })
      } else {
        resolve({success: true, shouldSave: false})
      }
    })
  },

  [types.game.actions.restartGame]: ({commit, state}, level) => {
    return new Promise((resolve, reject) => {
      let initialGameState = INITIAL_GAME_STATE()
      if (level) {
        initialGameState.level = level
        commit(types.game.mutations.setCurrentLevel, level)
      } else {
        initialGameState.level = state.currentLevel
      }

      commit(types.game.mutations.setGame, initialGameState)
      EventBus.resetGame()
      resolve({success: true})
    })
  },

  [types.game.actions.revealCell]: ({state, commit, dispatch}, data) => {
    return new Promise((resolve, reject) => {
      // check if is the first revealed cell, if yes so start the game
      if (state.game.cellsRevealedNum === 0) {
        dispatch(types.game.actions.startGame)
      }

      commit(types.game.mutations.setRevealCell, data)

      // check if game over
      if (state.game.grid[data.cell.x][data.cell.y].hasMine) {
        dispatch(types.game.actions.gameOver)
      } else {
        let levelSize = state.game.level.rowsNum * state.game.level.colsNum
        let minesNum = state.game.level.minesNum
        // check if the user won
        if (state.game.cellsRevealedNum === (levelSize - minesNum)) {
          dispatch(types.game.actions.doWinner)
        }
      }

      resolve({success: true})
    })
  },

  [types.game.actions.gameOver]: ({commit}) => {
    return new Promise((resolve, reject) => {
      commit(types.game.mutations.setGameStatus, MINESWEEPER.GAME.STATUS.GAME_OVER)
      resolve({success: true})
    })
  },

  [types.game.actions.doWinner]: ({commit}) => {
    return new Promise((resolve, reject) => {
      commit(types.game.mutations.setGameStatus, MINESWEEPER.GAME.STATUS.WINNER)
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
