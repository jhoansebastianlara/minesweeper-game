// constants, general purposes
export const CONSTANTS = {
  LANGUAGES: {
    DEFAULT: 'en',
    EN: 'en',
    ES: 'es'
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
      LOSER: 3
    }
  }
}
