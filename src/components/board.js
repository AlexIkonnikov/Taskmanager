import AbstractComponent from './abstract-component';

const returnBoardMarkup = () => {
  return (
    `<section class="board container"></section>`
  );
};

export default class Board extends AbstractComponent {
  getMarkup() {
    return returnBoardMarkup();
  }
}
