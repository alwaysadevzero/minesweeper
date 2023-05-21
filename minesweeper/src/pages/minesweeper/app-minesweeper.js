import Board from '../../utils/boardLogic';
import '../../reset.css';
import '../../styles.css';

import createComponent from './components/board/board';

const classboard = new Board();

classboard.generateBoard();
// eslint-disable-next-line no-console
classboard.showBoard();

const sweeper = createComponent(classboard);
document.body.append(sweeper);
