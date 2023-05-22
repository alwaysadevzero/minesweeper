import { shuffle, adjacentMinesCounter, getAdjacentCells } from './board-helper';

export default class Board {
  constructor(row = 10, col = 10, mines = 10) {
    this.row = row;
    this.col = col;
    this.mines = mines;
    this.board = [];
    this.isFilled = false;
    this.gameOver = false;
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

  openCell(row, col) {
    if (this.gameOver) return false;

    if (this.board[row][col].mine) {
      this.gameOver = true;
      return false;
    }
    if (this.board[row][col].counter === 0) {
      this.openEmptyCell(row, col);
    }
    this.board[row][col].open = true;
    return true;
  }

  openEmptyCell(row, col) {
    const checkCells = getAdjacentCells(row, col, this.row, this.col);
    for (let i = 0; i < checkCells.length; i += 1) {
      const [checkRow, checkCol] = checkCells[i];
      const cell = this.board[checkRow][checkCol];
      if (!cell.open && cell.counter) {
        cell.open = true;
      }
      if (!cell.open && cell.counter === 0) {
        cell.open = true;
        this.openEmptyCell(checkRow, checkCol);
      }
    }
  }

  getFlatArray() {
    return this.board.flat();
  }

  showMines() {
    for (let row = 0; row < this.row; row += 1) {
      for (let col = 0; col < this.col; col += 1) {
        if (this.board[row][col].mine) this.board[row][col].open = true;
      }
    }
  }

  getSizes() {
    return [this.row, this.col];
  }

  fillBoard(rowClick, colClick) {
    this.board[rowClick][colClick].open = true;

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
