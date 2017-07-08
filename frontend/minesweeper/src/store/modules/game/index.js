import types from '@/store/types'
import {MINESWEEPER, INITIAL_GAME_STATE} from '@/shared/constants'
import EventBus from '@/shared/EventBus'

const state = {
  game: INITIAL_GAME_STATE()
}

const getters = {
  [types.game.getters.getGame]: (state) => {
    return state.game
  }
}

const mutations = {
  [types.game.mutations.setGame]: (state, newGame) => {
    console.log('newGame: ', newGame)
    state.game.status = MINESWEEPER.GAME.STATUS.READY_TO_PLAY
    state.game = newGame
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
    state.game.grid[cell.x][cell.y].isRevealed = true
    state.game.cellsRevealedNum++

    if (!automatically) {
      state.game.moves++
    }
  },

  [types.game.mutations.setTime]: (state, time) => {
    state.game.time = time
  },

  [types.game.mutations.setGameStatus]: (state, newStatus) => {
    state.game.status = newStatus
  }
}

const actions = {
  [types.game.actions.startGame]: ({commit}) => {
    return new Promise((resolve, reject) => {
      commit(types.game.mutations.setGameStatus, MINESWEEPER.GAME.STATUS.PLAYING)
      resolve({success: true})
    })
  },

  [types.game.actions.restartGame]: ({commit}) => {
    console.log('restartGame...')
    return new Promise((resolve, reject) => {
      commit(types.game.mutations.setGame, INITIAL_GAME_STATE())
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
      }

      let levelSize = state.game.level.rowsNum * state.game.level.colsNum
      console.log('levelSize: ', levelSize)
      let minesNum = state.game.level.minesNum
      console.log('minesNum: ', minesNum)
      console.log('state.game.cellsRevealedNum: ', state.game.cellsRevealedNum)
      // check if the user won
      if (state.game.cellsRevealedNum === (levelSize - minesNum)) {
        dispatch(types.game.actions.doWinner)
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
