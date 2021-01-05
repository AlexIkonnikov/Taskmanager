import {createElement} from '../utils';

const returnElementMarkup = () => {
  return (`<p class="board__no-tasks">Click «ADD NEW TASK» in menu to create your first task</p>`);
};

export default class NoTaskView {
  constructor() {
    this._element = null;
  }

  getMarkup() {
    return returnElementMarkup();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getMarkup());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
