const createElement = (markup) => {
  const div = document.createElement(`div`);
  div.innerHTML = markup;
  return div.firstChild;
};

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREBEGIN: `beforebegin`,
};

const render = (parent, component, position = RenderPosition.BEFOREBEGIN) => {
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      parent.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREBEGIN:
      parent.append(component.getElement());
      break;
  }
};

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();
  const isExistElements = !!(parentElement && newElement && oldElement);

  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

export {createElement, render, replace, remove};
