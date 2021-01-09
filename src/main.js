import Menu from './components/menu.js';
import Filter from './components/filter.js';
import FilterList from './components/board-filter.js';
import Form from './components/form.js';
import Cart, {COUNT_CARTS} from './components/cart.js';
import Button from './components/button.js';
import NoTaskView from './components/no-task';
import BoardController from './controllers/board-controller';
import {generateFilters} from './mock/filter.js';
import {generateTasks} from './mock/task.js';
import {render, replace, remove} from './utils/render';

const START_NUMBER_TASKS = 8;
const tasks = generateTasks(COUNT_CARTS);
const filters = generateFilters();

const mainPool = document.querySelector(`.main`);
const poolForMenu = mainPool.querySelector(`.main__control`);


render(poolForMenu, new Menu());
render(mainPool, new Filter(filters));
render(mainPool, new FilterList());

const board = mainPool.querySelector(`.board`);
const tasksPlace = mainPool.querySelector(`.board__tasks`);

const renderTasks = (placeToCarts, task) => {
  const cartTask = new Cart(task);
  const form = new Form(task);

  const onEscDown = (evt) => {
    if (evt.keyCode === 27) {
      replace(cartTask, form);
      document.removeEventListener(`keydown`, onEscDown);
    }
  };

  const replaceCartToForm = () => {
    replace(form, cartTask);
    document.addEventListener(`keydown`, onEscDown);
  };

  const replaceFormToCart = (evt) => {
    evt.preventDefault();
    replace(cartTask, form);
  };

  cartTask.setEditButtonClickHandler(replaceCartToForm);
  form.setSubmitHandler(replaceFormToCart);

  render(placeToCarts, cartTask);
};


let showingTasks = START_NUMBER_TASKS;

if (tasks.length < 1) {
  render(tasksPlace, new NoTaskView());
} else {
  tasks.slice(0, START_NUMBER_TASKS).forEach((it) => {
    renderTasks(tasksPlace, it);
  });
}

const loadMoreButton = new Button();
render(board, loadMoreButton);

loadMoreButton.setClickHandler(() => {
  const onViewCarts = showingTasks;
  showingTasks += START_NUMBER_TASKS;

  tasks.slice(onViewCarts, showingTasks).forEach((it) => {
    renderTasks(tasksPlace, it);
  });

  if (showingTasks >= tasks.length) {
    remove(loadMoreButton);
  }
});

export {tasks};
