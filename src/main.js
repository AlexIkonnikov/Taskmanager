import Menu from './components/menu.js';
import Filter from './components/filter.js';
import FilterList from './components/board-filter.js';
import Form from './components/form.js';
import Cart, {COUNT_CARTS} from './components/cart.js';
import Button from './components/button.js';
import NoTaskView from './components/no-task';
import {generateFilters} from './mock/filter.js';
import {generateTasks} from './mock/task.js';
import {render} from './utils';

const START_NUMBER_TASKS = 8;
const tasks = generateTasks(COUNT_CARTS);
const filters = generateFilters();

const mainPool = document.querySelector(`.main`);
const poolForMenu = mainPool.querySelector(`.main__control`);


render(poolForMenu, new Menu().getElement(), `beforebegin`);
render(mainPool, new Filter(filters).getElement(), `beforebegin`);
render(mainPool, new FilterList().getElement(), `beforebegin`);

const board = mainPool.querySelector(`.board`);
const tasksPlace = mainPool.querySelector(`.board__tasks`);

const renderTasks = (placeToCarts, task) => {
  const cartTask = new Cart(task);
  const editButton = cartTask.getElement().querySelector(`.card__btn--edit`);

  const form = new Form(task);
  const editForm = form.getElement().querySelector(`form`);

  const onEscDown = (evt) => {
    if (evt.keyCode === 27) {
      placeToCarts.replaceChild(cartTask.getElement(), form.getElement());
      document.removeEventListener(`keydown`, onEscDown);
    }
  };

  const replaceCartToForm = () => {
    placeToCarts.replaceChild(form.getElement(), cartTask.getElement());
    document.addEventListener(`keydown`, onEscDown);
  };

  const replaceFormToCart = (evt) => {
    evt.preventDefault();
    placeToCarts.replaceChild(cartTask.getElement(), form.getElement());
  };

  editButton.addEventListener(`click`, replaceCartToForm);
  editForm.addEventListener(`submit`, replaceFormToCart);

  render(placeToCarts, cartTask.getElement(), `beforebegin`);
};


let showingTasks = START_NUMBER_TASKS;

if (tasks.length < 1) {
  render(tasksPlace, new NoTaskView().getElement(), `beforebegin`);
} else {
  tasks.slice(0, START_NUMBER_TASKS).forEach((it) => {
    renderTasks(tasksPlace, it);
  });
}

render(board, new Button().getElement(), `beforebegin`);

const loadMoreButton = document.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const onViewCarts = showingTasks;
  showingTasks += START_NUMBER_TASKS;

  tasks.slice(onViewCarts, showingTasks).forEach((it) => {
    renderTasks(tasksPlace, it);
  });

  if (showingTasks >= tasks.length) {
    loadMoreButton.remove();
  }
});

export {tasks};
