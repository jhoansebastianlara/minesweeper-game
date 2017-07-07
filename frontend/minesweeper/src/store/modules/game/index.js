import types from '@/store/types'
import {MINESWEEPER} from '@/shared/constants'

const state = {
  game: {
    level: MINESWEEPER.LEVELS.MEDIUM,
    status: MINESWEEPER.GAME.STATUS.READY_TO_PLAY,
    grid: null,
    flagsNum: 0,
    cellsRevealedNum: 0,
    moves: 0,
    time: 0,
    score: 0
  }
}

const getters = {
  [types.game.getters.getGame]: (state) => {
    return state.game
  }
}

const mutations = {
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

  [types.game.actions.revealCell]: ({state, commit, dispatch}, data) => {
    return new Promise((resolve, reject) => {
      // check if is the first revealed cell, if yes so start the game
      if (state.game.cellsRevealedNum === 0) {
        dispatch(types.game.actions.startGame)
      }

      // check if game over
      if (state.game.grid[data.cell.x][data.cell.y].hasMine) {
        dispatch(types.game.actions.gameOver)
      }

      commit(types.game.mutations.setRevealCell, data)
      resolve({success: true})
    })
  },

  [types.game.actions.gameOver]: ({commit}) => {
    return new Promise((resolve, reject) => {
      commit(types.game.mutations.setGameStatus, MINESWEEPER.GAME.STATUS.GAME_OVER)
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
