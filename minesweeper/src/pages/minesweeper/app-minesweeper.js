import '../../reset.css';
import '../../styles.css';

import Minesweeper from '../../utils/mineSweeperLogic';
import * as Board from './components/board/board';
import * as Level from './components/level/level';
import * as Status from './components/status/status';
import * as Results from './components/results/results';

const minesweeper = new Minesweeper(10, 10, 10);

const board = Board.createComponent(minesweeper);
const level = Level.createComponent();
const status = Status.createComponent(minesweeper);
const results = Results.createComponent(minesweeper);
document.body.append(level, status, board, results);
