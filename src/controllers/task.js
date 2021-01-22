import {render, replace, remove} from '../utils/render';
import Form from '../components/form.js';
import Task from '../components/task.js';
import AbstractComponent from '../components/abstract-component';

export default class TaskController extends AbstractComponent {
  constructor(container, onDataChange) {
    super();
    this._container = container;

    this._taskComponent = null;
    this._formComponent = null;
    this._onDataChange = onDataChange;
    this.replaceCartToForm = this.replaceCartToForm.bind(this);
    this.replaceFormToCart = this.replaceFormToCart.bind(this);
  }

  replaceCartToForm(evt) {
    evt.preventDefault();
    replace(this._formComponent, this._taskComponent);
  }

  replaceFormToCart(evt) {
    evt.preventDefault();
    replace(this._taskComponent, this._formComponent);
  }

  render(task) {
    let oldTaskComponent = this._taskComponent;
    this._taskComponent = new Task(task);
    this._formComponent = new Form(task);

    const onEscDown = (evt) => {
      if (evt.keyCode === 27) {
        replace(this._taskComponent, this._formComponent);
        document.removeEventListener(`keydown`, onEscDown);
      }
    };

    this._taskComponent.setEditButtonClickHandler(this.replaceCartToForm);
    this._formComponent.setSubmitHandler(this.replaceFormToCart);

    this._taskComponent.setArchiveButtonClick(() => {
      this._onDataChange(this, task, Object.assign({}, task, {isArchive: !task.isArchive}));
      console.log('archive')
    });
    this._taskComponent.setFavoritesButtonClick(() => {
      this._onDataChange(this, task, Object.assign({}, task, {isFavorite: !task.isFavorite}));
    });
    if (oldTaskComponent) {
      replace(this._taskComponent, oldTaskComponent);
    } else {
      render(this._container.getElement(), this._taskComponent);
    }
  }
}

