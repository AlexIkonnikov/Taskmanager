import Board from './components/board';
import Menu from './components/menu.js';
import Filter from './components/filter.js';
import {COUNT_CARTS} from './components/task.js';
import BoardController from './controllers/board';
import {generateFilters} from './mock/filter.js';
import {generateTasks} from './mock/task.js';
import {render} from './utils/render';

const tasks = generateTasks(COUNT_CARTS);
const filters = generateFilters(tasks);
const mainPool = document.querySelector(`.main`);
const poolForMenu = mainPool.querySelector(`.main__control`);

render(poolForMenu, new Menu());
render(mainPool, new Filter(filters));

const board = new Board();
render(mainPool, board);
const boardContreller = new BoardController(board.getElement());
boardContreller.render(tasks);
