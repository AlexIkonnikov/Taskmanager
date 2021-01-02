import {returnMenuMarkup} from './components/menu.js';
import {returnFiltersMarkup} from './components/filter.js';
import {returnBoardMarkup} from './components/board-filter.js';
import {returnFormMarkup} from './components/form.js';
import {returnCartMarkup, COUNT_CARTS} from './components/cart.js';
import {returnButtonMarkup} from './components/button.js';
import {generateFilters} from './mock/filter.js';
import {generateTasks, generateTask} from './mock/task.js';

const task = generateTask();
const tasks = generateTasks(COUNT_CARTS);
const filters = generateFilters();
const renderMarkup = (markup, pool, position = `beforeend`) => {
  pool.insertAdjacentHTML(position, markup);
};

const mainPool = document.querySelector(`.main`);
const poolForMenu = mainPool.querySelector(`.main__control`);

renderMarkup(returnMenuMarkup(), poolForMenu);
renderMarkup(returnFiltersMarkup(filters, tasks), mainPool);
renderMarkup(returnBoardMarkup(), mainPool);
const board = mainPool.querySelector(`.board`);
const tasksPlace = mainPool.querySelector(`.board__tasks`);
renderMarkup(returnFormMarkup(task), tasksPlace);
for (let i = 0; i < COUNT_CARTS; i++) {
  renderMarkup(returnCartMarkup(tasks[i]), tasksPlace);
}
renderMarkup(returnButtonMarkup(), board);

export {tasks};
