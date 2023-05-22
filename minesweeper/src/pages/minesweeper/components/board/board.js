import './board.css';
import createElement from '../../../../utils/create-element';

const CssClasses = {
  CONTAINER: 'field',
};

let InstanceBoard;
let componentCont;

function updateComponent(rowClick, colClick) {
  const gameStatus = InstanceBoard.openCell(rowClick, colClick);

  const board = InstanceBoard.getFlatArray();
  const renderCells = componentCont.querySelectorAll('td');
  if (board.length !== renderCells.length) throw new Error('length rendered cells !==  length board');

  for (let i = 0; i < renderCells.length; i += 1) {
    if (gameStatus && board[i].open) {
      renderCells[i].dataset.count = board[i].counter;
      renderCells[i].classList.add('open');
    }
    if (!gameStatus && board[i].mine) {
      renderCells[i].dataset.mine = 'true';
    }
  }
  if (!gameStatus) {
    // eslint-disable-next-line no-console
    console.log('YOU LOOSE');
  }
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
    updateComponent(row, col);
  }
}

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

export default createComponent;
