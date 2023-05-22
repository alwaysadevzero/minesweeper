import './saveLoadReload.css';
import createElement from '../../../../utils/create-element';
import { saveGame, loadGame, restartGame } from '../board/board';

const CssClasses = {
  CONTAINER: 'savegame',
  BUTTON: 'savegame__button',
};

const TEXT_BUTTON_SAVE = 'Save';
const TEXT_BUTTON_LOAD = 'Load';
const TEXT_BUTTON_RELOAD = 'Reload';

function createComponent() {
  const component = createElement({
    tagName: 'div',
    className: CssClasses.CONTAINER,
  });

  const buttonSave = createElement({
    tagName: 'button',
    className: CssClasses.BUTTON,
    textContent: TEXT_BUTTON_SAVE,
    onClickHandler: saveGame,
  });

  const buttonLoad = createElement({
    tagName: 'button',
    className: CssClasses.BUTTON,
    textContent: TEXT_BUTTON_LOAD,
    onClickHandler: loadGame,
  });

  const buttonReload = createElement({
    tagName: 'button',
    className: CssClasses.BUTTON,
    textContent: TEXT_BUTTON_RELOAD,
    onClickHandler: restartGame,
  });

  component.append(buttonSave, buttonLoad, buttonReload);
  return component;
}
// eslint-disable-next-line  import/prefer-default-export
export { createComponent };
