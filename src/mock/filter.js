
import {COUNT_CARTS} from '../components/cart';
import {tasks} from '../main';

let typeTask = {
  all:COUNT_CARTS,
  overdue: 0,
  today: 0,
  favorites: 0,
  repeating: 0,
  archive: 0,
  countAll: function() {
      this.all = COUNT_CARTS - this.archive;
  }
};

const tasksNames = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `archive`
];

const countNumberTasks = (tasks) => {
  let date = new Date();
  tasks.map((it) => {
    if (it.isArchive) {
      typeTask.archive += 1;
    }
    if (it.isFavorite) {
      typeTask.favorites += 1;
    }
    if (it.isRepeating) {
      typeTask.repeating += 1;
    }
    if (it.dueDate && (it.dueDate.getFullYear() < date.getFullYear() || it.dueDate.getMonth() < date.getMonth() || it.dueDate.getDate() < date.getDate())) {
      typeTask.overdue += 1;
    }

    if (it.dueDate && it.dueDate.getFullYear() == date.getFullYear() && it.dueDate.getMonth() == date.getMonth() && it.dueDate.getDate() == date.getDate()) {
      typeTask.today += 1;
    }
    typeTask.countAll();
  });
};

const generateFilters = () => {
  countNumberTasks(tasks);
  return tasksNames.map((it) => {
    return {
      name: it,
      count: typeTask[it],
    };
  });
};

export {generateFilters, typeTask};
