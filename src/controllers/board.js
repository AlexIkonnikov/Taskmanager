import Tasks from "../components/tasks";
import Sorting, {SortType} from '../components/sorting.js';
import Form from '../components/form.js';
import Task from '../components/task.js';
import Button from '../components/button.js';
import NoTaskView from '../components/no-task';
import {render, replace, remove} from '../utils/render';

let START_NUMBER_TASKS = 8;
let AFTER_CLICK_NUMBER_TASK = 8;


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

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._noTasksComponent = new NoTaskView();
    this._sorting = new Sorting();
    this._taskBoardComponent = new Tasks();
    this._loadMoreButton = new Button();
  }

  render(tasks) {
    this.originalTasks =tasks.slice();
    render(this._container, this._sorting);
    const tasksBoard = this._taskBoardComponent;
    render(this._container, tasksBoard);
    const isAllTaskArchived = tasks.every((task) => task.isArchived);

    if (isAllTaskArchived) {
      render(tasksBoard.getElement(), this._noTasksComponent);
      return;
    } else {
      tasks.slice(0, START_NUMBER_TASKS).forEach((it) => {
        renderTasks(tasksBoard.getElement(), it);
      });
    }

    const renderLoadMoreButton = () => {

      if (START_NUMBER_TASKS >= tasks.length) {
        return;
      }

      render(this._container, this._loadMoreButton);

      this._loadMoreButton.setClickHandler(() => {

        tasks.slice(START_NUMBER_TASKS, START_NUMBER_TASKS + AFTER_CLICK_NUMBER_TASK).forEach((it) => {
          renderTasks(tasksBoard.getElement(), it);
        });

        START_NUMBER_TASKS += AFTER_CLICK_NUMBER_TASK;

        if (START_NUMBER_TASKS >= tasks.length) {
          remove(this._loadMoreButton);
        }
      });
    };

    renderLoadMoreButton();

    this._sorting.setSortTypeChangeHandler((sortType) => {
      tasksBoard.getElement().innerHTML = ``;
      const sortedTasks = this._getSortedTasks(tasks, sortType);
      sortedTasks.slice(0, START_NUMBER_TASKS).forEach((it) => {
        renderTasks(tasksBoard.getElement(), it);
      });
    });
  }

  _getSortedTasks(tasks, sortType) {
    switch (sortType) {
      case SortType.DATE_UP:
        tasks.sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortType.DATE_DOWN:
        tasks.sort((a, b) => b.dueDate - a.dueDate);
        break;
      case SortType.DEFAULT:
        return this.originalTasks;
    }
    return tasks;
  };
}
