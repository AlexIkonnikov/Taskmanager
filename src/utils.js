const customTimeFormat = (value) => {

  return value < 10 ? `0${value}` : value;
};

export const formatTime = (date) => {

  const hours = customTimeFormat(date.getHours() % 12);
  const minutes = customTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};
