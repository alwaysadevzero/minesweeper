import './board.css';
import createElement from '../../../../utils/create-element';

const CssClasses = {
  CONTAINER: 'field',
};

function clickListener(event) {
  event.preventDefault();
  if (event.target.tagName.toLowerCase() === 'td') {
    const cell = event.target;
    const row = cell.parentElement.rowIndex;
    const col = cell.cellIndex;

    // eslint-disable-next-line no-console
    console.log(`Вы кликнули на ${row} ${col}`);

    // eslint-disable-next-line no-console
    // if (event.type === 'contextmenu') console.log('правая');
  }
}

function generateTable(rows, columns) {
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

function createComponent(rows, columns) {
  const tableHTML = generateTable(rows, columns);
  const divContainer = createElement({
    tagName: 'div',
    className: CssClasses.CONTAINER,
  });

  divContainer.innerHTML = tableHTML;
  divContainer.addEventListener('click', clickListener);
  divContainer.addEventListener('contextmenu', clickListener);
  return divContainer;
}

export default createComponent;
