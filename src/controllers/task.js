import {render, replace, remove} from '../utils/render';
import Form from '../components/form.js';
import Task from '../components/task.js';

export default class TaskController {
  constructor(container) {
    this._container = container;

    this._taskComponent = null;
    this._formComponent = null;
  }

  render(task) {
    this._taskComponent = new Task(task);
    this._formComponent = new Form(task);

    const onEscDown = (evt) => {
      if (evt.keyCode === 27) {
        replace(this._taskComponent, this._formComponent);
        document.removeEventListener(`keydown`, onEscDown);
      }
    };

    const replaceCartToForm = () => {
      replace(this._formComponent, this._taskComponent);
      document.addEventListener(`keydown`, onEscDown);
    };

    const replaceFormToCart = (evt) => {
      evt.preventDefault();
      replace(this._taskComponent, this._formComponent);
    };

    this._taskComponent.setEditButtonClickHandler(replaceCartToForm);
    this._formComponent.setSubmitHandler(replaceFormToCart);
    render(this._container.getElement(), this._taskComponent);
  }
}

