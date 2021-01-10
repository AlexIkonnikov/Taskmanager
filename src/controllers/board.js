import Tasks from "../components/tasks";
import Sorting, {SortType} from '../components/sorting.js';
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

const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];
  const showingTasks = tasks.slice();
  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
      case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
      case SortType.DEFAULT:
        sortedTasks = showingTasks;
        break;
  }
  return sortedTasks;
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTaskView();
    this._sorting = new Sorting();
    this._taskBoardComponent = new Tasks();
    this._loadMoreButton = new Button();
  }

  render(tasks) {

    render(this._container, this._sorting);
    const tasksBoard = this._taskBoardComponent;
    render(this._container, tasksBoard);
    let showingTasks = START_NUMBER_TASKS;
    const isAllTaskArchived = tasks.every((task) => task.isArchived);
    if (isAllTaskArchived) {
      render(tasksBoard.getElement(), this._noTasksComponent);
      return;
    } else {
      tasks.slice(0, START_NUMBER_TASKS).forEach((it) => {
        renderTasks(tasksBoard.getElement(), it);
      });
    }

    const loadMoreButton = this._loadMoreButton;
    render(this._container, loadMoreButton);

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
    this._sorting.setSortTypeChangeHandler((sortType) => {
      tasksBoard.getElement().innerHTML = ``;

      const sortedTasks = getSortedTasks(tasks, sortType, 0, START_NUMBER_TASKS);

      sortedTasks.slice(0, START_NUMBER_TASKS).forEach((it) => {
        renderTasks(tasksBoard.getElement(), it);
      });
      render(this._container, loadMoreButton);
    });
  }
}
