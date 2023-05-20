import './sweeper.css';
import { createElement } from  '../../../../utils/create-element';

const CssClasses = {
  CONTAINER: "field"
}

function createComponent(rows, columns) {
  const tableHTML = generateTable(rows, columns)
  const divContainer = createElement({
      tagName: 'div',
      className: CssClasses.CONTAINER,
      });
      
  divContainer.innerHTML = tableHTML
  divContainer.addEventListener('click', clickListener);
  
  return divContainer
}

function generateTable(rows, columns) {
  let table = '<table>';

  for (let i = 0; i < rows; i++) {
      table += '<tr>';

      for (let j = 0; j < columns; j++) {
          table += '<td></td>';
      }
      table += '</tr>';
  }
  table += '</table>';
  return table;
}

function clickListener(event) {
  if (event.target.tagName.toLowerCase() === 'td') {
    const cell = event.target;
    const row = cell.parentElement.rowIndex
    const col = cell.cellIndex
    console.log('Вы кликнули на ' + row + ' ' + col);
  }
}

export default createComponent;