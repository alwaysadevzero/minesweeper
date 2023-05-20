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
  
  return divContainer
}

function generateTable(rows, columns) {
  let table = '<table>';

  for (let i = 0; i < rows; i++) {
      table += '<tr>';

      for (let j = 0; j < columns; j++) {
          table += '<td>';
          // table += 'Cell ' + (i+1) + '-' + (j+1);
          table += '</td>';
      }
      table += '</tr>';
  }
  table += '</table>';
  return table;
}

export default createComponent;