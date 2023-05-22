import Minesweeper from '../../utils/mineSweeperLogic';
import '../../reset.css';
import '../../styles.css';

import * as Board from './components/board/board';
import * as SaveGame from './components/saveLoadReload/saveLoadReload';

const minesweeper = new Minesweeper(10, 10, 10);

const board = Board.createComponent(minesweeper);
const saveGame = SaveGame.createComponent();

document.body.append(saveGame, board);
// classboard.generateBoard();
// eslint-disable-next-line no-console
// classboard.showBoard();
SaveGame.createComponent(minesweeper);
