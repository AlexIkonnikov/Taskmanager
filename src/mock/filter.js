

const filtersNames = [
  `all`, `overdue`, `today`, `favorites`, `repeating`, `archive`
];

const countNumberTasks = (tasksArray) => {
  let date = new Date();
  let typeTask = {
    all: 0,
    overdue: 0,
    today: 0,
    favorites: 0,
    repeating: 0,
    archive: 0,
  };
  tasksArray.map((it) => {
    typeTask.all ++;
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

    if (it.dueDate && it.dueDate.getFullYear() === date.getFullYear() && it.dueDate.getMonth() === date.getMonth() && it.dueDate.getDate() === date.getDate()) {
      typeTask.today += 1;
    }
  });
  return typeTask;
};

const generateFilters = (tasks) => {
  let tasksArray = countNumberTasks(tasks);
  return filtersNames.map((it) => {
    return {
      name: it,
      count: tasksArray[it],
    };
  });
};

export {generateFilters};
