const tasks = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const days = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
const repeatingDays = {
  mo: true,
  tu: false,
  we: false,
  th: false,
  fr: false,
  sa: false,
  su: false,
};

const mounths = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
const colors = [`black`, `yellow`, `blue`, `green`, `pink`];

const generateIntNumber = (min, max) => {
  return (min + Math.floor(Math.random() * (max - min)));
};

const generateRandomDate = () => {
  const dateTime = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diff = sign * generateIntNumber(0, 8);
  dateTime.setDate(dateTime.getDate() + diff);
  return dateTime;
};

const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? null : generateRandomDate();
  return {
    discription: tasks[Math.floor(Math.random() * tasks.length)],
    dueDate,
    color: colors[Math.floor(Math.random() * colors.length)],
    repeatingDays,
    isArchive: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    isRepeating: Math.random() > 0.5,
  };
};

const generateTasks = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateTask);
};

export {generateTasks, generateTask, colors, mounths, days};
