import Board from './components/board';
import Menu from './components/menu.js';
import {COUNT_CARTS} from './components/task.js';
import BoardController from './controllers/board';
import {generateTasks} from './mock/task.js';
import {render} from './utils/render';
import Tasks from './models/tasks';
import FilterController from './controllers/filter';

const tasks = generateTasks(COUNT_CARTS);
const mainPool = document.querySelector(`.main`);
const poolForMenu = mainPool.querySelector(`.main__control`);
const tasksModel = new Tasks();
tasksModel.setTasks(tasks);

render(poolForMenu, new Menu());
const filterController = new FilterController(mainPool, tasksModel);
filterController.render();

const board = new Board();
const boardContreller = new BoardController(board.getElement(), tasksModel);

render(mainPool, board);
boardContreller.render();
