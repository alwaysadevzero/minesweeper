import '../../reset.css';
import '../../styles.css';

import Minesweeper from '../../utils/mineSweeperLogic';
import * as Board from './components/board/board';
import * as Level from './components/level/level';
import * as Status from './components/status/status';

const minesweeper = new Minesweeper(10, 10, 10);

const board = Board.createComponent(minesweeper);
// const saveGame = SaveGame.createComponent();
const level = Level.createComponent();
const status = Status.createComponent();
document.body.append(level, status, board);
