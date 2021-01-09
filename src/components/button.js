import AbstractComponent from './abstract-component';

const returnButtonMarkup = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class Button extends AbstractComponent {
  getMarkup() {
    return returnButtonMarkup();
  }
}
