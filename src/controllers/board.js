import Tasks from "../components/tasks";
import Sorting from '../components/sorting.js';
import Form from '../components/form.js';
import Task from '../components/task.js';
import Button from '../components/button.js';
import NoTaskView from '../components/no-task';
import {render, replace, remove} from '../utils/render';

const START_NUMBER_TASKS = 8;

const renderTasks = (placeToCarts, task) => {
  const cartTask = new Task(task);
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

  render(board, new Sorting());

  const tasksBoard = new Tasks();

  render(board, tasksBoard);

  let showingTasks = START_NUMBER_TASKS;
  if (tasks.every((it) => it.isArchive === true)) {
    render(tasksBoard.getElement(), new NoTaskView());
    return;
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

export default class BoardController {
  constructor(container) {
    this._container = container;
  }

  render(tasks) {
    renderBoard(this._container, tasks);
  }
}
