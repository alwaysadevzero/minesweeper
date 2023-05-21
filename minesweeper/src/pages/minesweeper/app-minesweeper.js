import '../../reset.css';
import '../../styles.css';

import createComponent from './components/sweeper/sweeper';

const sweeper = createComponent(10, 10);

document.body.append(sweeper);
