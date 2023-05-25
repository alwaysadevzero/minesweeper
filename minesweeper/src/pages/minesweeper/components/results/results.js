import './results.css';
import createElement from '../../../../utils/create-element';

const CssClasses = {
  CONTAINER: 'results',
  RESULT: 'result',
  LINE: 'line',
};

const table = [];
let mineSweeper;
let component;

function updateComponent() {
  while (component.lastChild) component.removeChild(component.lastChild);

  for (let i = 0; i < table.length; i += 1) {
    const line = createElement({ tagName: 'div', className: CssClasses.LINE });

    const entries = Object.entries(table[i]);
    for (let j = 0; j < entries.length; j += 1) {
      const key = entries[j][0];
      const value = entries[j][1];

      const resultKey = createElement({ tagName: 'div', className: `${key}`, textContent: `${key}` });
      const resultValue = createElement({ tagName: 'div', textContent: `${value}` });

      resultKey.append(resultValue);
      line.append(resultKey);
    }
    component.append(line);
  }
}

function saveResult() {
  const result = mineSweeper.getResult();
  table.unshift(result);
  if (table.length > 9) table.pop();
  updateComponent();
}

function saveComponent() {
  const savedResults = JSON.stringify(table);
  localStorage.setItem('results', savedResults);
}

function loadGame() {
  const loadResults = JSON.parse(localStorage.getItem('results'));
  table.push(...loadResults);
  updateComponent();
}

function createComponent(Minesweeper) {
  mineSweeper = Minesweeper;
  component = createElement({
    tagName: 'div',
    className: CssClasses.CONTAINER,
  });
  window.addEventListener('beforeunload', saveComponent);
  window.addEventListener('load', loadGame);

  return component;
}
// eslint-disable-next-line
export { createComponent, saveResult, updateComponent};
