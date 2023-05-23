import { shuffle, adjacentMinesCounter, getAdjacentCells } from './board-helper';

export default class Board {
  constructor(row = 10, col = 10, mines = 10) {
    this.row = row;
    this.col = col;
    this.mines = mines;
    this.board = [];
    this.gameOver = false;
    this.gameWin = false;
    this.gameRun = false;
    this.steps = null;
    this.time = null;
    this.clicks = null;
    this.flags = 0;
    this.score = 0;
  }

  generateBoard() {
    this.board = new Array(this.row);
    for (let i = 0; i < this.row; i += 1) {
      this.board[i] = new Array(this.col);
      for (let j = 0; j < this.col; j += 1) {
        this.board[i][j] = {
          counter: null,
          open: false,
          flagged: false,
          mine: false,
        };
      }
    }
  }

  saveGame() {
    const savedGame = {
      row: this.row,
      col: this.col,
      mines: this.mines,
      board: this.board,
      isFilled: this.isFilled,
      gameOver: this.gameOver,
      gameWin: this.gameWin,
      gameRun: this.gameRun,
      steps: this.steps,
      time: this.time,
      clicks: this.clicks,
      flags: this.flags,
      score: this.score,
    };
    return JSON.stringify(savedGame);
  }

  loadGame(savedGame) {
    try {
      const parsedGame = JSON.parse(savedGame);
      this.row = parsedGame.row;
      this.col = parsedGame.col;
      this.mines = parsedGame.mines;
      this.board = parsedGame.board;
      this.isFilled = parsedGame.isFilled;
      this.gameOver = parsedGame.gameOver;
      this.gameWin = parsedGame.gameWin;
      this.steps = parsedGame.steps;
      this.gameRun = parsedGame.gameRun;
      this.time = parsedGame.time;
      this.flags = parsedGame.flags;
      this.score = parsedGame.score;
      this.clicks = parsedGame.clicks;
    } catch (error) {
      throw new Error('Invalid saved game data');
    }
  }

  resizeBoard(row, col, mines) {
    if (row > 0 && col > 0) {
      this.row = row;
      this.col = col;
    }
    if (mines > 0) {
      this.mines = mines;
    }
    this.generateBoard();
  }

  restartGame() {
    this.gameOver = false;
    this.gameWin = false;
    this.gameRun = false;
    this.steps = null;
    this.time = null;
    this.flags = 0;
    this.score = 0;
    this.clicks = 0;
    this.generateBoard();
  }

  openCell(row, col) {
    if (this.gameOver) return false;
    if (this.gameWin) return false;

    const currentCell = this.board[row][col];

    if (currentCell.flagged) return true;

    if (currentCell.mine) {
      this.gameOver = true;
      this.gameRun = false;
      return false;
    }
    if (currentCell.counter === 0) {
      this.openEmptyCell(row, col);
    } else {
      this.score += 1;
    }
    this.clicks += 1;
    currentCell.open = true;
    // eslint-disable-next-line no-console
    if (this.score === (this.row * this.col) - this.mines) {
      this.gameWin = true;
    }
    return true;
  }

  changeflagCell(row, col) {
    this.clicks += 1;
    const cell = this.board[row][col];

    if (!cell.flagged && this.flags >= this.mines) return cell.flagged;

    if (cell.open) return cell.flagged;

    if (cell.flagged) {
      this.flags -= 1;
    } else {
      this.flags += 1;
    }
    cell.flagged = !cell.flagged;
    return cell.flagged;
  }

  offFlagFlatArr(index) {
    const arr = this.getFlatArray();
    arr[index].flagged = false;
    // this.flags -= 1;
  }

  openEmptyCell(row, col) {
    const checkCells = getAdjacentCells(row, col, this.row, this.col);

    for (let i = 0; i < checkCells.length; i += 1) {
      const [checkRow, checkCol] = checkCells[i];
      const cell = this.board[checkRow][checkCol];

      if (!cell.open && cell.counter) {
        cell.open = true;
        this.score += 1;
      }
      if (!cell.open && cell.counter === 0) {
        cell.open = true;
        this.score += 1;
        this.openEmptyCell(checkRow, checkCol);
      }
      if (cell.open && cell.flagged) {
        this.flags -= 1;
        cell.flagged = false;
      }
      if (this.score === (this.row * this.col) - this.mines) this.gameWin = true;
    }
  }

  getFlatArray() {
    return this.board.flat();
  }

  getSizes() {
    return [this.row, this.col];
  }

  fillBoard(rowClick, colClick) {
    const totalCells = this.row * this.col;
    let positions = [];

    for (let i = 0; i < totalCells; i += 1) {
      positions.push(i);
    }
    // Удаление позиции клика из массива позиций
    const clickPosition = rowClick * this.col + colClick;
    positions.splice(clickPosition, 1);
    // Перемешивание позиций
    positions = shuffle(positions);
    // Установка мин на случайных позициях
    for (let i = 0; i < this.mines; i += 1) {
      const position = positions[i];
      const row = Math.floor(position / this.col);
      const col = position % this.col;
      this.board[row][col].mine = true;
    }
    this.board = adjacentMinesCounter(this.board);
  }

  showBoard() {
    // eslint-disable-next-line no-console
    console.log(this.board);
  }
}
