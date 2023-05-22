import './board.css';
import createElement from '../../../../utils/create-element';

const CssClasses = {
  CONTAINER: 'field',
  STATUS: 'status',
  LOSE: 'lose',
  WIN: 'win',
};

const TEXT_BOARD_WIN = 'YOU WIN!';
const TEXT_BOARD_LOSE = 'YOU LOSE!';

let InstanceBoard;
let componentCont;

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

function drawGameOver(board, collectionCells) {
  const cells = collectionCells;
  for (let i = 0; i < collectionCells.length; i += 1) {
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
  componentCont.append(element);
}
function drawGame(board, collectionCells) {
  const cells = collectionCells;
  for (let i = 0; i < collectionCells.length; i += 1) {
    const { open, counter, flagged } = board[i];
    if (open) {
      if (counter > 0) cells[i].dataset.count = counter;
      cells[i].classList.add('open');

      InstanceBoard.offFlagFlatArr(i);
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
  componentCont.append(element);
}

function updateComponent() {
  const board = InstanceBoard.getFlatArray();
  const collectionCells = componentCont.querySelectorAll('td');
  if (board.length !== collectionCells.length) throw new Error('length rendered cells !==  length board');

  if (InstanceBoard.gameOver) {
    drawGameOver(board, collectionCells);
    // eslint-disable-next-line no-console
    console.log('YOU LOOSE');
  }
  if (InstanceBoard.gameWin) {
    drawGameWin();
  }
  if (!InstanceBoard.gameOver) {
    drawGame(board, collectionCells);
  }
}

function saveGame() {
  if (InstanceBoard.gameOver && InstanceBoard.isFilled) return;
  // Сохранение игры
  const savedGame = InstanceBoard.saveGame();
  localStorage.setItem('savedGame', savedGame);
  // eslint-disable-next-line no-console
  console.log('save game');
}

function loadGame() {
  // Загрузка игры
  const loadgame = localStorage.getItem('savedGame');
  InstanceBoard.loadGame(loadgame);

  const [row, col] = InstanceBoard.getSizes();
  componentCont.innerHTML = renderComponent(row, col);
  updateComponent();
  // eslint-disable-next-line no-console
  console.log('load game');
}

function restartGame(boardRow, BoardCol, mines) {
  let [row, col] = [boardRow, BoardCol];
  let minesNum = mines;
  if (!(col > 0 && col <= 25
      && row > 0 && row <= 25)) {
    [row, col] = InstanceBoard.getSizes();
  }
  if (minesNum >= boardRow * BoardCol || !minesNum) {
    minesNum = 10;
  }
  componentCont.innerHTML = renderComponent(row, col);
  InstanceBoard.restartGame(row, col, minesNum);
}

function clickListener(event) {
  event.preventDefault();
  if (event.target.tagName.toLowerCase() === 'td') {
    const cell = event.target;
    const row = cell.parentElement.rowIndex;
    const col = cell.cellIndex;
    if (!InstanceBoard.isFilled) {
      InstanceBoard.isFilled = true;
      InstanceBoard.fillBoard(row, col);
    }
    // eslint-disable-next-line no-console
    if (event.type === 'contextmenu') {
      InstanceBoard.changeflagCell(row, col);
    }
    if (event.type === 'click') {
      InstanceBoard.openCell(row, col);
    }

    updateComponent();
  }
}

function createComponent(Board) {
  InstanceBoard = Board;
  InstanceBoard.generateBoard();

  const [row, col] = Board.getSizes();
  const component = createElement({
    tagName: 'div',
    className: CssClasses.CONTAINER,
  });

  component.innerHTML = renderComponent(row, col);
  component.addEventListener('click', clickListener);
  component.addEventListener('contextmenu', clickListener);

  componentCont = component;

  return component;
}

export {
  createComponent, saveGame, loadGame, restartGame,
};
