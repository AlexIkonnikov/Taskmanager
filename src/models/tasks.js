const FILTERTYPE = {
  All: `all`,
  Overdue: `overdue`,
  Today: `today`,
  Favorites: `favorites`,
  Repeating: `repeating`,
  Archive: `archive`,
}

export default class Tasks {
  constructor() {
    this._tasks = [];
    this._dataChangeHandler = [];
    this._filtertype = FILTERTYPE.All;
  }

  getFilterTasks() {

  }

  getAllTasks() {
    return this._tasks;
  }

  setTasks(tasks) {
    this._tasks = Array.from(tasks);
    this._callHandlers(this._dataChangeHandler);
  }

  updateTask(id, task) {
    const index = this._tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), task, this._tasks.slice(index + 1));
    return true;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandler.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
