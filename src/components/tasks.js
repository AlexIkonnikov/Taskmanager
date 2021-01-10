import AbstractComponent from './abstract-component';

const returnTasksMarkup = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

export default class Tasks extends AbstractComponent {
  getMarkup() {
    return returnTasksMarkup();
  }
}
