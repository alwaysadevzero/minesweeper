import Board from '../../utils/mineSweeperLogic';
import '../../reset.css';
import '../../styles.css';

import createComponent from './components/board/board';

const classboard = new Board(10, 10, 10);

// classboard.generateBoard();
// eslint-disable-next-line no-console
// classboard.showBoard();

const sweeper = createComponent(classboard);
document.body.append(sweeper);
