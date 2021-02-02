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
    this._filterChangeHandler;
  }

  setFilterTypeChangeHandler(cb) {
    this._filterChangeHandler = cb;
  }

  changeFilter() {
    this._filterChangeHandler();
  }

  getFilterType() {
    return this._filtertype;
  }

  getFilterTasks() {
    let date = new Date();
    let filterTasks = [];
    switch (this._filtertype) {
      case FILTERTYPE.Overdue: {
        filterTasks = this._tasks.filter((task) => {
          return task.dueDate && (task.dueDate.getFullYear() < date.getFullYear() || task.dueDate.getMonth() < date.getMonth() || task.dueDate.getDate() < date.getDate())
        });
        break;
      }
      case FILTERTYPE.Today: {
        filterTasks = this._tasks.filter((task) => {
          return task.dueDate && task.dueDate.getFullYear() === date.getFullYear() && task.dueDate.getMonth() === date.getMonth() && task.dueDate.getDate() === date.getDate();
        });
        break;
      }
      case FILTERTYPE.Favorites: {
        filterTasks = this._tasks.filter((task) => {
          return task.isFavorite === true;
        });
        break;
      }
      case FILTERTYPE.Repeating: {
        filterTasks = this._tasks.filter((task) => {
          return task.isRepeating === true;
        });
        break;
      }
      case FILTERTYPE.Archive: {
        filterTasks = this._tasks.filter((task) => {
          return task.isArchive === true;
        });
        break;
      }
      case FILTERTYPE.All: {
        return filterTasks = this._tasks;
      }
    }
    return filterTasks;
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
