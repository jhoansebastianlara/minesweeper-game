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
    level: MINESWEEPER.LEVELS.MEDIUM,
    status: MINESWEEPER.GAME.STATUS.READY_TO_PLAY,
    grid: null,
    flagsNum: 0,
    cellsRevealedNum: 0,
    moves: 0,
    time: 0,
    // TODO
    score: 0,
    // comes from api when the game is saved
    gameId: null
  }
}

// -- API --
// endpoints
export const ENDPOINTS = {
  USER: {
    ROOT: 'user',
    AUTH: 'auth'
  },
  GAMES: {
    ROOT: 'games',
    DETAIL: 'games/:id',
    CELLS: 'games/:id/cells'
  }
}

// The API attempts to return appropriate HTTP status codes for every request
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500
}

// When the this API returns error messages, it does so in JSON format.
export const ERROR_CODES = {
  // Corresponds with HTTP 404 - the specified resource was not found.
  NOT_FOUND: 34,
  // Corresponds with HTTP 400. One or more required inputs missing
  MISSING_FIELDS: 45,
  // Corresponds with HTTP 500 - An unknown internal error occurred.
  INTERNAL_ERROR: 131
}

export const LOCAL_STORAGE = {
  AUTH_USER: 'minesweeper:auth_user'
}
