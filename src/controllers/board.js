import Tasks from "../components/tasks";
import Sorting, {SortType} from '../components/sorting.js';
import Form from '../components/form.js';
import Task from '../components/task.js';
import Button from '../components/button.js';
import NoTaskView from '../components/no-task';
import {render, replace, remove} from '../utils/render';

let START_NUMBER_TASKS = 8;
let AFTER_CLICK_NUMBER_TASK = 8;

export default class BoardController {
  constructor(container) {
    this._container = container;
    this._noTasksComponent = new NoTaskView();
    this._sorting = new Sorting();
    this._taskBoardComponent = new Tasks();
    this._loadMoreButton = new Button();
  }

  _renderSorting() {
    render(this._container, this._sorting);
  }

  _renderBoard() {
    render(this._container, this._taskBoardComponent);
  }

  _renderNoTaskComponent() {
    render(this._taskBoardComponent.getElement(), this._noTasksComponent);
  }

  _renderLoadMoreButton() {
    if (START_NUMBER_TASKS >= this._tasks.length) {
      return;
    }

    render(this._container, this._loadMoreButton);
    this._loadMoreButton.setClickHandler(() => {
      this._tasks.slice(START_NUMBER_TASKS, START_NUMBER_TASKS + AFTER_CLICK_NUMBER_TASK).forEach((it) => {
        this._renderTask(this._taskBoardComponent, it);
      });

      START_NUMBER_TASKS += AFTER_CLICK_NUMBER_TASK;
      if (START_NUMBER_TASKS >= this._tasks.length) {
        remove(this._loadMoreButton);
      }
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
        return this._originalTasks;
    }
    return tasks;
  }

  _renderTask(placeToCarts, task) {
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
    render(placeToCarts.getElement(), cartTask);
  }

  _renderTasks(tasks) {
    tasks.slice(0, START_NUMBER_TASKS).forEach((it) => {
      this._renderTask(this._taskBoardComponent, it);
    });
  }

  render(tasks) {
    this._tasks = tasks;
    this._originalTasks =tasks.slice();
    this._renderSorting();
    this._renderBoard();

    const isAllTaskArchived = tasks.every((task) => task.isArchived);
    if (isAllTaskArchived) {
      this._renderNoTaskComponent();
      return;
    } else {
      this._renderTasks(tasks);
    }
    this._renderLoadMoreButton();

    this._sorting.setSortTypeChangeHandler((sortType) => {
      this._taskBoardComponent.getElement().innerHTML = ``;
      const sortedTasks = this._getSortedTasks(this._tasks, sortType);
      this._renderTasks(sortedTasks);
    });
  }
}
