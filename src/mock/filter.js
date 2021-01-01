const tasksNames = [
  `all`, `overdue`, `overdue`, `favorites`, `repeating`, `archive`
];

const generateFilters = () => {
  return tasksNames.map((it) => {
    return {
      name: it,
      count: Math.floor(Math.random() * 10),
    };
  });
};

export {generateFilters};
