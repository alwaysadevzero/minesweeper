import './status.css';
import createElement from '../../../../utils/create-element';

const CssClasses = {
  DIAL: 'dial',
  CONTAINER: 'status-dial',
  TIME: 'time',
  MINE_REMAIN: 'mine-remain',
  FLAGS_REMAIN: 'flag-remain',
  CLICKS: 'clicks',
};

const COMPONENTS = {
  TIME: null,
  MINE_REMAIN: null,
  FLAGS_REMAIN: null,
  CLICKS: null,
};

const TEXT_TIME = 'Time';
const TEXT_MINE_REMAIN = 'Mine remain';
const TEXT_FLAGS_REMAIN = 'Flag remain';
const TEXT_CLICKS = 'Clicks';

let Minesweeper;
let timerId;

function runSecondCounter() {
  let seconds = 0;
  const timer = COMPONENTS.TIME.lastChild;
  // eslint-disable-next-line
  console.log(timer);

  timer.textContent = String(seconds).padStart(3, '0');

  timerId = setInterval(() => {
    if (timer.textContent === '999') clearInterval(timerId);

    seconds += 1;
    timer.textContent = String(seconds).padStart(3, '0');
  }, 1000);
}

function stopSecondCounter() {
  clearInterval(timerId);
  timerId = null;
}

function updateComponent() {
  if (Minesweeper.gameRun && !timerId) runSecondCounter();
  if (!Minesweeper.gameRun && timerId) stopSecondCounter();
  // COMPONENTS.TIME.lastChild.textContent = '000';
  // seconds = null;
  // timerId = null;

  if (Minesweeper.gameRun) {
    COMPONENTS.CLICKS.lastChild.textContent = Minesweeper.clicks;
    COMPONENTS.FLAGS_REMAIN.lastChild.textContent = Minesweeper.flags;
  }
}

function createDial() {
  const wrapper = createElement({
    tagName: 'div',
    className: CssClasses.DIAL,
  });
  return wrapper;
}

function createComponent(classSweeper) {
  Minesweeper = classSweeper;
  const component = createElement({
    tagName: 'div',
    className: CssClasses.CONTAINER,
  });

  COMPONENTS.TIME = createElement({
    tagName: 'div',
    className: CssClasses.TIME,
    textContent: TEXT_TIME,
  });

  COMPONENTS.MINE_REMAIN = createElement({
    tagName: 'div',
    className: CssClasses.MINE_REMAIN,
    textContent: TEXT_MINE_REMAIN,
  });

  COMPONENTS.CLICKS = createElement({
    tagName: 'div',
    className: CssClasses.CLICKS,
    textContent: TEXT_CLICKS,
  });

  COMPONENTS.FLAGS_REMAIN = createElement({
    tagName: 'div',
    className: CssClasses.FLAGS_REMAIN,
    textContent: TEXT_FLAGS_REMAIN,
  });

  COMPONENTS.TIME.append(createDial());
  COMPONENTS.MINE_REMAIN.append(createDial());
  COMPONENTS.FLAGS_REMAIN.append(createDial());
  COMPONENTS.CLICKS.append(createDial());

  component.append(
    COMPONENTS.TIME,
    COMPONENTS.MINE_REMAIN,
    COMPONENTS.FLAGS_REMAIN,
    COMPONENTS.CLICKS,
  );
  return component;
}
// eslint-disable-next-line  import/prefer-default-export
export { createComponent, updateComponent };
