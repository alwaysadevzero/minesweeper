import audolist from '../../../../utils/audioList';
import './audio.css';
import createElement from '../../../../utils/create-element';
import svgContent from '../../../../assets/audio.svg';

const CssClasses = {
  CONTAINER: 'audio',
  BUTTON: 'audio__svg',
  MUTE: 'mute',
  VOLUME: 'audio__volume',
};

let inputElementrange;
let svg;
const audio = new Audio();

async function playAudio() {
  try {
    await audio.play();
  } catch (err) {
    // eslint-disable-next-line
    console.log('Play failed', err);
  }
}

function changeVolumeListener() {
  audio.volume = Number(inputElementrange.value);
  svg.classList.remove('muted');
}

function muteListener() {
  audio.volume = 0;
  inputElementrange.value = '0';
  svg.classList.add('muted');
}

function playLeftClick() {
  audio.src = audolist.click;
  audio.currentTime = 0;
  playAudio(audolist.click);
}

function playRightClick() {
  audio.src = audolist.rightClick;
  audio.currentTime = 0;
  playAudio(audolist.rightClick);
}

function playWin() {
  audio.src = audolist.win;
  audio.currentTime = 0;
  playAudio(audolist.win);
}

function playLose() {
  audio.src = audolist.lose;
  audio.currentTime = 0;
  playAudio(audolist.lose);
}

function createComponent() {
  const component = createElement({
    tagName: 'div',
    className: CssClasses.CONTAINER,
  });

  svg = createElement({
    tagName: 'div',
    className: CssClasses.BUTTON,
  });

  svg.innerHTML = svgContent;

  // Create the input element
  const inputElement = createElement({
    tagName: 'input',
    className: CssClasses.VOLUME,
  });

  svg.addEventListener('click', muteListener);

  inputElementrange = inputElement;
  inputElement.setAttribute('type', 'range');
  inputElement.setAttribute('min', '0');
  inputElement.setAttribute('max', '1');
  inputElement.setAttribute('step', '0.01');

  inputElementrange.addEventListener('input', changeVolumeListener);
  component.append(svg, inputElement);
  return component;
}

export {
  createComponent, playWin, playLose, playLeftClick, playRightClick,
};
