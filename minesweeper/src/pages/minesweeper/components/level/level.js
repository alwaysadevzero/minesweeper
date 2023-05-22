import createElement from '../../../../utils/create-element';
import { restartGame } from '../board/board';

const CssClasses = {
  CONTAINER: 'difficult',
  LABEL: 'select-level',
  SELECT_DIV: 'select',
  FOCUS: 'focus',
  SELECT: 'select',
  OPTION: 'option',
  Size: 'size',
  FORM_CONTAINER: 'form',
  RANGE_DIV: 'range',
  RANGE: 'range-input',
  OUTPUT: 'range-output',
  APPLY: 'apply',
};

const TEXT_LEVEL = 'Level';
const TEXT_MINES = 'Bombs number:';
const TEXT_APPLY = 'Apply';
const DIFFICULT = {
  TEXT_DIFFICULT_EASY: 'Easy',
  TEXT_DIFFICULT_MIDDLE: 'Middle',
  TEXT_DIFFICULT_HARD: 'Hard',
};

// let selectComponent;
let rangeComponent;
let rangeOutputComponent;
let size;

function changeSizeRange(selectedValue) {
  rangeComponent.value = '10';
  rangeOutputComponent.value = '10';
  if (selectedValue === DIFFICULT.TEXT_DIFFICULT_EASY) {
    rangeComponent.max = '99';
    size = 10;
  }
  if (selectedValue === DIFFICULT.TEXT_DIFFICULT_MIDDLE) {
    rangeComponent.max = '224';
    size = 15;
  }
  if (selectedValue === DIFFICULT.TEXT_DIFFICULT_HARD) {
    rangeComponent.max = '624';
    size = 25;
  }
  // eslint-disable-next-line
  console.log(size)
}

function makeApply() {
  // eslint-disable-next-line
  console.log(rangeComponent.value)
  restartGame(size, size, rangeComponent.value);
}

function createSelectComponent() {
  const component = createElement({
    tagName: 'div',
    className: CssClasses.CONTAINER,
  });
  const label = createElement({
    tagName: 'label',
    className: CssClasses.LABEL,
    textContent: TEXT_LEVEL,
  });

  const selectDiv = createElement({
    tagName: 'div',
    className: CssClasses.SELECT_DIV,
  });

  const select = createElement({
    tagName: 'select',
    className: CssClasses.SELECT,
  });
  select.id = CssClasses.LABEL;

  const elems = [
    DIFFICULT.TEXT_DIFFICULT_EASY,
    DIFFICULT.TEXT_DIFFICULT_MIDDLE,
    DIFFICULT.TEXT_DIFFICULT_HARD,
  ];

  for (let i = 0; i < elems.length; i += 1) {
    const option = createElement({
      tagName: 'option',
      textContent: elems[i],
      className: CssClasses.OPTION,
    });

    select.append(option);
  }
  // selectComponent = select;
  selectDiv.append(select);
  component.append(label, selectDiv);

  select.addEventListener('change', () => { changeSizeRange(select.value); });
  return component;
}

function createRangeComoponent() {
  const component = createElement({
    tagName: 'div',
    className: CssClasses.FORM_CONTAINER,
  });

  const label = createElement({
    tagName: 'label',
    className: CssClasses.LABEL,
    textContent: TEXT_MINES,
  });

  const rangeDiv = createElement({
    tagName: 'div',
    className: CssClasses.RANGE_DIV,
  });

  const range = createElement({
    tagName: 'input',
    className: CssClasses.RANGE,
  });
  range.type = 'range';
  range.min = '1';
  range.max = '99';
  range.step = '1';
  range.value = '10';

  const output = createElement({
    tagName: 'output',
    className: CssClasses.OUTPUT,
    textContent: range.value,
  });

  range.addEventListener('input', () => {
    output.textContent = range.value;
  });

  rangeComponent = range;
  rangeOutputComponent = output;

  rangeDiv.append(range, output);
  component.append(label, rangeDiv);
  return component;
}

function createApplyComponent() {
  const component = createElement({
    tagName: 'button',
    className: CssClasses.APPLY,
    textContent: TEXT_APPLY,
  });
  component.addEventListener('click', makeApply);
  return component;
}

function createComponent() {
  const component = createSelectComponent();
  component.append(createRangeComoponent(), createApplyComponent());

  // component.append(buttonSave, buttonLoad, buttonReload);
  return component;
}
// eslint-disable-next-line  import/prefer-default-export
export { createComponent, DIFFICULT };
