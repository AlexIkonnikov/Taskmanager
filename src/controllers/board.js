import Tasks from "../components/tasks";
import Sorting, {SortType} from '../components/sorting.js';
import Button from '../components/button.js';
import NoTaskView from '../components/no-task';
import {render, remove} from '../utils/render';
import TaskController from './task';

let START_NUMBER_TASKS = 8;
let AFTER_CLICK_NUMBER_TASK = 8;

export default class BoardController {
  constructor(container, taskModel) {
    this._container = container;

    this._taskModel = taskModel;
    this._startNumberTasks = 8;
    this._showingTaskControllers = [];
    this._noTasksComponent = new NoTaskView();
    this._sorting = new Sorting();
    this._taskBoardComponent = new Tasks();
    this._loadMoreButton = new Button();
    this._onChangeSortType = this._onChangeSortType.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._onChangeView = this._onChangeView.bind(this);
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
    const tasks = this._taskModel.getTasks();
    if (START_NUMBER_TASKS >= tasks.length) {
      return;
    }

    render(this._container, this._loadMoreButton);
    this._loadMoreButton.setClickHandler(() => {
      const sortedTasks = this._makeSorted(tasks, this._sorting.getSortType());
      const newTasks = this._renderTasks(this._taskBoardComponent, sortedTasks.slice(START_NUMBER_TASKS, START_NUMBER_TASKS + AFTER_CLICK_NUMBER_TASK), this._onDataChange, this._onChangeView);
      this._showingTaskControllers = this._showingTaskControllers.concat(newTasks);

      START_NUMBER_TASKS += AFTER_CLICK_NUMBER_TASK;
      if (START_NUMBER_TASKS >= tasks.length) {
        remove(this._loadMoreButton);
      }
    });
  }

  _makeSorted(tasks, sortType) {
    let sortedTasks = tasks.slice();
    switch (sortType) {
      case SortType.DATE_UP:
        sortedTasks = this._taskModel.getTasks().slice().sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortType.DATE_DOWN:
        sortedTasks = this._taskModel.getTasks().slice().sort((a, b) => b.dueDate - a.dueDate);
        break;
      default:
        sortedTasks = this._taskModel.getTasks();
        break;
    }
    return sortedTasks;
  }

  _onChangeSortType(sortType) {
    START_NUMBER_TASKS = 8;
    remove(this._loadMoreButton);
    this._renderLoadMoreButton();
    this._taskBoardComponent.getElement().innerHTML = ``;
    const sortedTasks = this._makeSorted(this._taskModel.getTasks(), sortType);
    const newTasks = this._renderTasks(this._taskBoardComponent, sortedTasks.slice(0, START_NUMBER_TASKS), this._onDataChange, this._onChangeView);
    this._showingTaskControllers = newTasks;
  }

  _renderTasks(placeToCarts, tasks, onDataChange, onViewChange) {
    return tasks.map((task) => {
      const taskController = new TaskController(placeToCarts, onDataChange, onViewChange);
      taskController.render(task);
      return taskController;
    });
  }

  _onDataChange(taskController, oldTask, newTask) {
    const isSuccses = this._taskModel.updateTask(oldTask.id, newTask);
    if (isSuccses) {
      taskController.render(newTask);
    }
  }

  _onChangeView() {
    this._showingTaskControllers.forEach((it) => it.setDefaultView());
  }

  render() {
    const tasks = this._taskModel.getTasks();
    this._renderSorting();
    this._renderBoard();

    const isAllTaskArchived = tasks.every((task) => task.isArchived);
    if (isAllTaskArchived) {
      this._renderNoTaskComponent();
      return;
    }

    const newTasks = this._renderTasks(this._taskBoardComponent, tasks.slice(0, START_NUMBER_TASKS), this._onDataChange, this._onChangeView);
    this._showingTaskControllers = this._showingTaskControllers.concat(newTasks);
    this._renderLoadMoreButton();
    this._sorting.setSortTypeChangeHandler(this._onChangeSortType);
  }
}
