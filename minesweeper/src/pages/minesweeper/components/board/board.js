import './board.css';
import createElement from '../../../../utils/create-element';

const CssClasses = {
  CONTAINER: 'field',
};

let InstanceBoard;
let componentCont;

function updateComponent() {
  const board = InstanceBoard.board.flat();
  const cells = componentCont.querySelectorAll('td');

  if (board.length !== cells.length) throw new Error('board.length !== cells.length');

  for (let i = 0; i < board.length; i += 1) {
    if (board[i].mine) {
      cells[i].innerHTML = board[i].mine;
    } else {
      cells[i].innerHTML = board[i].counter;
    }
  }
}

// eslint-disable-next-line no-console
// console.log(InstanceBoard.board);

function clickListener(event) {
  event.preventDefault();
  if (event.target.tagName.toLowerCase() === 'td') {
    const cell = event.target;
    const row = cell.parentElement.rowIndex;
    const col = cell.cellIndex;

    if (!InstanceBoard.isFilled) {
      InstanceBoard.isFilled = true;
      InstanceBoard.generateBoard();
      InstanceBoard.fillBoard(row, col);
    }
    updateComponent();
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
