import Tasks from "../components/tasks";
import Sorting, {SortType} from '../components/sorting.js';
import Button from '../components/button.js';
import NoTaskView from '../components/no-task';
import {render, remove} from '../utils/render';
import TaskController from './task';

let START_NUMBER_TASKS = 8;
let AFTER_CLICK_NUMBER_TASK = 8;

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._showingTaskControllers = [];
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
      const newTasks = this._renderTasks(this._taskBoardComponent, this._tasks.slice(START_NUMBER_TASKS, START_NUMBER_TASKS + AFTER_CLICK_NUMBER_TASK));
      this._showingTaskControllers = this._showingTaskControllers.concat(newTasks);
      console.log(this._showingTaskControllers);
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

  _renderTasks(placeToCarts, tasks) {
    return tasks.map((task) => {
      const taskController = new TaskController(placeToCarts);
      taskController.render(task);
      return taskController;
    });
  }

  render(tasks) {
    this._tasks = tasks;
    this._originalTasks =tasks.slice();
    this._renderSorting();
    this._renderBoard();

    const isAllTaskArchived = this._tasks.every((task) => task.isArchived);
    if (isAllTaskArchived) {
      this._renderNoTaskComponent();
      return;
    } else {
      const newTasks = this._renderTasks(this._taskBoardComponent, this._tasks.slice(0, START_NUMBER_TASKS));
      this._showingTaskControllers = this._showingTaskControllers.concat(newTasks);
    }
    this._renderLoadMoreButton();

    this._sorting.setSortTypeChangeHandler((sortType) => {
      this._taskBoardComponent.getElement().innerHTML = ``;
      const sortedTasks = this._getSortedTasks(this._tasks, sortType);
      const newTasks = this._renderTasks(this._taskBoardComponent, sortedTasks.slice(0, START_NUMBER_TASKS));
      this._showingTaskControllers = newTasks;
    });
  }
}
