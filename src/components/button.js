import {createElement} from "../utils";

const returnButtonMarkup = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class Button {

  getMarkup () {
    return returnButtonMarkup();
  }

  getElement () {
    if (!this._element) {
      this._element = createElement(this.getMarkup());
    }

    return this._element;
  }

  removeElement () {
    this._element = null;
  }
}
