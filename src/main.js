import Board from './components/board';
import Tasks from "./components/tasks";
import Menu from './components/menu.js';
import Filter from './components/filter.js';
import Sorting from './components/sorting.js';
import Form from './components/form.js';
import Cart, {COUNT_CARTS} from './components/task.js';
import Button from './components/button.js';
import NoTaskView from './components/no-task';
import BoardController from './controllers/board';
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

const board = new Board();

render(mainPool, board);
render(board.getElement(), new Sorting());

const tasksBoard = new Tasks();

render(board.getElement(), tasksBoard);

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

const renderBoard = (board, tasks) => {


  let showingTasks = START_NUMBER_TASKS;
  if (tasks.length < 1) {
    render(tasksPlace, new NoTaskView());
  } else {
    tasks.slice(0, START_NUMBER_TASKS).forEach((it) => {
      renderTasks(tasksBoard.getElement(), it);
    });
  }

  const loadMoreButton = new Button();
  render(board, loadMoreButton);

  loadMoreButton.setClickHandler(() => {
    const onViewCarts = showingTasks;
    showingTasks += START_NUMBER_TASKS;

    tasks.slice(onViewCarts, showingTasks).forEach((it) => {
      renderTasks(tasksBoard.getElement(), it);
    });

    if (showingTasks >= tasks.length) {
      remove(loadMoreButton);
    }
  });
};

renderBoard(board.getElement(), tasks);


export {tasks};
