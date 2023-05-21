import '../../reset.css';
import '../../styles.css';

import createComponent from './components/board/board';

const sweeper = createComponent(10, 10);

document.body.append(sweeper);
