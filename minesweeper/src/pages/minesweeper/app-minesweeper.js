import Minesweeper from '../../utils/mineSweeperLogic';
import '../../reset.css';
import '../../styles.css';

import * as Board from './components/board/board';
import * as SaveGame from './components/saveLoadReload/saveLoadReload';
import * as Level from './components/level/level';

const minesweeper = new Minesweeper(20, 20, 50);

const board = Board.createComponent(minesweeper);
const saveGame = SaveGame.createComponent();
const level = Level.createComponent();
document.body.append(level, saveGame, board);
// classboard.generateBoard();
// eslint-disable-next-line no-console
// classboard.showBoard();
SaveGame.createComponent(minesweeper);
