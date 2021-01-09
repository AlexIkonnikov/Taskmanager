const createElement = (markup) => {
  const div = document.createElement(`div`);
  div.innerHTML = markup;
  return div.firstChild;
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREBEGIN: `beforebegin`,
};

const render = (parent, element, position = RenderPosition.BEFOREBEGIN) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      parent.prepend(element);
      break;
    case RenderPosition.BEFOREBEGIN:
      parent.append(element);
  }
};

const replace = (parent, newElement, oldElement) => {
  parent.replaceChild(newElement, oldElement);
};

export {createElement, render, replace};
