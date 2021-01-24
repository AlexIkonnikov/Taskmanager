import {render, replace} from '../utils/render';
import Form from '../components/form.js';
import Task from '../components/task.js';

const MODE = {
  DEFAULT: `default`,
  EDIT: `edit`,
}

export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._taskComponent = null;
    this._formComponent = null;
    this._mode = MODE.DEFAULT;
    this._onDataChange = onDataChange;
    this.onViewChange = onViewChange;
    this.replaceCartToForm = this.replaceCartToForm.bind(this);
    this.replaceFormToCart = this.replaceFormToCart.bind(this);
    this.onEscDown = this.onEscDown.bind(this);
  }

  replaceCartToForm(evt) {
    this.onViewChange();
    this._mode = MODE.EDIT;
    evt.preventDefault();
    replace(this._formComponent, this._taskComponent);
    document.addEventListener(`keydown`, this.onEscDown);
  }

  replaceFormToCart(evt) {
    evt.preventDefault();
    this._mode = MODE.DEFAULT;
    replace(this._taskComponent, this._formComponent);
  }

  onEscDown(evt) {
    if (evt.keyCode === 27) {
      this.replaceFormToCart(evt);
      document.removeEventListener(`keydown`, this.onEscDown);
    }
  }

  setDefaultView() {
    if (this._mode !== MODE.DEFAULT) {
      this._mode = MODE.DEFAULT;
      replace(this._taskComponent, this._formComponent);
    }
  }

  render(task) {
    let oldTaskComponent = this._taskComponent;
    let oldFormComponent = this._formComponent;
    this._taskComponent = new Task(task);
    this._formComponent = new Form(task);

    this._taskComponent.setEditButtonClickHandler(this.replaceCartToForm);
    this._formComponent.setSubmitHandler(this.replaceFormToCart);

    this._taskComponent.setArchiveButtonClick(() => {
      this._onDataChange(this, task, Object.assign({}, task, {isArchive: !task.isArchive}));
    });

    this._taskComponent.setFavoritesButtonClick(() => {
      this._onDataChange(this, task, Object.assign({}, task, {isFavorite: !task.isFavorite}));
    });

    if (oldTaskComponent && oldFormComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._formComponent, oldFormComponent);
    } else {
      render(this._container.getElement(), this._taskComponent);
    }
  }
}

