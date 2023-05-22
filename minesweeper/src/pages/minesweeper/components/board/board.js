import './board.css';
import createElement from '../../../../utils/create-element';

const CssClasses = {
  CONTAINER: 'field',
};

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

function updateComponent() {
  const board = InstanceBoard.getFlatArray();
  const collectionCells = componentCont.querySelectorAll('td');
  if (board.length !== collectionCells.length) throw new Error('length rendered cells !==  length board');

  if (!InstanceBoard.gameOver) {
    drawGame(board, collectionCells);
  }
  if (InstanceBoard.gameOver) {
    drawGameOver(board, collectionCells);
    // eslint-disable-next-line no-console
    console.log('YOU LOOSE');
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

function restartGame() {
  const [row, col] = InstanceBoard.getSizes();
  componentCont.innerHTML = renderComponent(row, col);
  InstanceBoard.restartGame();
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
  componentCont = component;
  component.innerHTML = renderComponent(row, col);
  component.addEventListener('click', clickListener);
  component.addEventListener('contextmenu', clickListener);

  return component;
}

export {
  createComponent, saveGame, loadGame, restartGame,
};
