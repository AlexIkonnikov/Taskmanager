let typeTask = {
  all: [],
  overdue: [],
  today: [],
  favorites: [],
  repeating: [],
  archive: [],
};

const filtersNames = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `archive`
];

const countNumberTasks = (tasksArray) => {
  let date = new Date();

  tasksArray.map((it) => {
    if (it.isArchive) {
      typeTask.archive.push(it);
    } else {
      typeTask.all.push(it);
    }
    if (it.isFavorite) {
      typeTask.favorites.push(it);
    }
    if (it.isRepeating) {
      typeTask.repeating.push(it);
    }
    if (it.dueDate && (it.dueDate.getFullYear() < date.getFullYear() || it.dueDate.getMonth() < date.getMonth() || it.dueDate.getDate() < date.getDate())) {
      typeTask.overdue.push(it);
    }

    if (it.dueDate && it.dueDate.getFullYear() === date.getFullYear() && it.dueDate.getMonth() === date.getMonth() && it.dueDate.getDate() === date.getDate()) {
      typeTask.today.push(it);
    }
  });
};

const generateFilters = (tasks) => {
  countNumberTasks(tasks);
  return filtersNames.map((it) => {
    return {
      name: it,
      count: typeTask[it].length,
    };
  });
};

export {generateFilters, typeTask};
