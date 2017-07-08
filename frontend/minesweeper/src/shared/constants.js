// constants, general purposes
export const CONSTANTS = {
  LANGUAGES: {
    DEFAULT: 'en',
    EN: 'en',
    ES: 'es'
  },

  // Available events executed on EventBus.js
  EVENTS: {
    CELL_REVEALED: 'cellRevealed',
    REVEAL_CELL_BASE: 'revealCell-[ID]',
    GAME_OVER: 'gameOver',
    RESET_GAME: 'resetGame',
    GAME_START: 'gameStart',
    GAME_FINISH: 'gameFinish'
  }
}

export const MINESWEEPER = {
  LEVELS: {
    EASY: {
      levelName: 'easy',
      minesNum: 10,
      rowsNum: 9,
      colsNum: 9
    },
    MEDIUM: {
      levelName: 'medium',
      minesNum: 40,
      rowsNum: 16,
      colsNum: 16
    },
    HARD: {
      levelName: 'hard',
      minesNum: 200,
      rowsNum: 30,
      colsNum: 24
    }
  },

  GAME: {
    STATUS: {
      READY_TO_PLAY: -1,
      PLAYING: 0,
      PAUSE: 1,
      WINNER: 2,
      GAME_OVER: 3
    }
  }
}

export const INITIAL_GAME_STATE = () => {
  return {
    level: MINESWEEPER.LEVELS.EASY,
    status: MINESWEEPER.GAME.STATUS.READY_TO_PLAY,
    grid: null,
    flagsNum: 0,
    cellsRevealedNum: 0,
    moves: 0,
    time: 0,
    score: 0
  }
}
