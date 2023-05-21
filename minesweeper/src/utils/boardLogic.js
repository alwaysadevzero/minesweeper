import { shuffle, adjacentMinesCounter } from './board-helper';

export default class Board {
  constructor(row = 5, col = 5, mines = 20) {
    this.row = row;
    this.col = col;
    this.mines = mines;
    this.board = [];
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

  getSizes() {
    return [this.row, this.col];
  }

  fillMinesBoard(rowClick, colClick) {
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
