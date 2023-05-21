import './board.css';
import createElement from '../../../../utils/create-element';

const CssClasses = {
  CONTAINER: 'field',
};

let InstanceBoard;
let componentCont;

function updateComponent() {
  let x = InstanceBoard.board;
  x = x.flat();
  const s = componentCont.querySelectorAll('td');

  for (let i = 0; i < x.length; i += 1) {
    if (x[i].mine) {
      s[i].innerHTML = x[i].mine;
    } else {
      s[i].innerHTML = x[i].counter;
    }
  }
}

function clickListener(event) {
  event.preventDefault();
  if (event.target.tagName.toLowerCase() === 'td') {
    const cell = event.target;
    const row = cell.parentElement.rowIndex;
    const col = cell.cellIndex;
    InstanceBoard.fillMinesBoard(row, col);
    InstanceBoard.showBoard();
    updateComponent();
  }
}

function generateBoard(rows, columns) {
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
  const tableHTML = generateBoard(row, col);
  const component = createElement({
    tagName: 'div',
    className: CssClasses.CONTAINER,
  });

  component.innerHTML = tableHTML;
  component.addEventListener('click', clickListener);
  // divContainer.addEventListener('contextmenu', clickListener);
  componentCont = component;
  return component;
}

export default createComponent;
