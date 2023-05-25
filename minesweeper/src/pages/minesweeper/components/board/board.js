import './board.css';
import createElement from '../../../../utils/create-element';
import * as Status from '../status/status';
import * as Audio from '../audio/audio';
import * as Results from '../results/results';

const CssClasses = {
  CONTAINER: 'field',
  STATUS: 'status',
  LOSE: 'lose',
  WIN: 'win',
};

const TEXT_BOARD_WIN = 'YOU WIN!';
const TEXT_BOARD_LOSE = 'YOU LOSE!';

let Minesweeper;
let boardComponet;

function renderComponent(rows, columns) {
  let table = '<table>';
  for (let i = 0; i < rows; i += 1) {
    table += '<tr>';

    for (let j = 0; j < columns; j += 1) {
      table += '<td></td>';
    }
    table += '</tr>';
  }
  table += '</table>';
  return table;
}

function drawGameOver(board, tdCells) {
  Results.saveResult();
  const cells = tdCells;
  for (let i = 0; i < cells.length; i += 1) {
    if (board[i].mine) {
      cells[i].dataset.mine = 'true';
    }
  }
  const element = createElement({
    tagName: 'div',
    className: CssClasses.STATUS,
    textContent: TEXT_BOARD_LOSE,
  });
  element.classList.add(CssClasses.LOSE);
  boardComponet.append(element);
}

function drawGame(board, tdCells) {
  const cells = tdCells;
  for (let i = 0; i < cells.length; i += 1) {
    const { open, counter, flagged } = board[i];
    if (open) {
      if (counter > 0) cells[i].dataset.count = counter;
      cells[i].classList.add('open');

      Minesweeper.offFlagFlatArr(i);
      cells[i].classList.remove('flag');
    }
    if (flagged && !open) {
      cells[i].classList.add('flag');
    }
    if (!flagged) cells[i].classList.remove('flag');
  }
}

function drawGameWin() {
  const element = createElement({
    tagName: 'div',
    className: CssClasses.STATUS,
    textContent: TEXT_BOARD_WIN,
  });
  element.classList.add(CssClasses.WIN);
  boardComponet.append(element);
}

function updateComponent() {
  const board = Minesweeper.getFlatArray();
  const cells = boardComponet.querySelectorAll('td');
  if (board.length !== cells.length) throw new Error('length rendered cells !==  length board');

  if (Minesweeper.gameOver) {
    Audio.playLose();
    drawGameOver(board, cells);
  }
  if (Minesweeper.gameWin) {
    Audio.playWin();
    drawGameWin();
  }
  if (Minesweeper.gameRun) {
    drawGame(board, cells);
  }
  Status.updateComponent();
}

function saveGame() {
  if (Minesweeper.gameOver && !Minesweeper.gameRun) return;
  const savedGame = Minesweeper.saveGame();
  localStorage.setItem('savedGame', savedGame);
}

function loadGame() {
  const loadgame = localStorage.getItem('savedGame');
  Minesweeper.loadGame(loadgame);

  const [row, col] = Minesweeper.getSizes();
  boardComponet.innerHTML = renderComponent(row, col);
  Status.clearComponent();
  updateComponent();
}

function restartGame() {
  const [row, col] = Minesweeper.getSizes();
  boardComponet.innerHTML = renderComponent(row, col);
  Status.clearComponent();
  Minesweeper.restartGame();
}

function changeSizeBoard(row, col, mines) {
  Minesweeper.resizeBoard(row, col, mines);
  restartGame();
}

function clickListener(event) {
  if (event.type === 'click') Audio.playLeftClick();
  if (event.type === 'contextmenu') Audio.playRightClick();
  event.preventDefault();
  if (event.target.tagName.toLowerCase() === 'td') {
    const cell = event.target;
    const row = cell.parentElement.rowIndex;
    const col = cell.cellIndex;

    if (!Minesweeper.gameRun) {
      Minesweeper.gameRun = true;
      Minesweeper.fillBoard(row, col);
    }
    if (event.type === 'contextmenu') {
      Minesweeper.changeflagCell(row, col);
    }
    if (event.type === 'click') {
      Minesweeper.openCell(row, col);
    }
    updateComponent();
  }
}

function createComponent(minesweeper) {
  Minesweeper = minesweeper;
  Minesweeper.generateBoard();

  const [row, col] = Minesweeper.getSizes();

  const component = createElement({
    tagName: 'div',
    className: CssClasses.CONTAINER,
  });

  component.innerHTML = renderComponent(row, col);
  component.addEventListener('click', clickListener);
  component.addEventListener('contextmenu', clickListener);

  boardComponet = component;

  return component;
}

export {
  createComponent, saveGame, loadGame, restartGame, changeSizeBoard,
};
