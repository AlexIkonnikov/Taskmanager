const customTimeFormat = (value) => {

  return value < 10 ? `0${value}` : value;
};

const formatTime = (date) => {

  const hours = customTimeFormat(date.getHours() % 12);
  const minutes = customTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const createElement = (markup) => {
  const div = document.createElement(`div`);
  div.innerHTML = markup;
  return div.firstChild;
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREBEGIN: `beforebegin`,
};

const render = (parent, element, position) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      parent.prepend(element);
      break;
    case RenderPosition.BEFOREBEGIN:
      parent.append(element);
  }
};

export {formatTime, createElement, render};
