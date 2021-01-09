import AbstractComponent from './abstract-component';

const returnElementMarkup = () => {
  return (`<p class="board__no-tasks">Click «ADD NEW TASK» in menu to create your first task</p>`);
};

export default class NoTaskView extends AbstractComponent {
  getMarkup() {
    return returnElementMarkup();
  }
}
