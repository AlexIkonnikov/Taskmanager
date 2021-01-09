import {formatTime} from '../utils/common';
import {mounths} from '../mock/task';
import AbstractComponent from './abstract-component';

const COUNT_CARTS = 20;
const returnCartMarkup = (tasks) => {
  const {discription, dueDate, color, isArchive, isFavorite, isRepeating} = tasks;
  const isDateShowing = !!dueDate && !isRepeating;
  const date = isDateShowing ? `${dueDate.getDate()} ${mounths[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;
  const deadLineClass = dueDate && dueDate < Date.now() && !isRepeating ? `card--deadline` : ``;
  const disabledClass = `card__btn--disabled`;

  return (
    `<article class="card card--${color} ${isRepeating ? `card--repeat` : ``}  ${deadLineClass}">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive ${isArchive ? `` : disabledClass}">
            archive
          </button>
          <button type="button" class="card__btn card__btn--favorites ${isFavorite ? `` : disabledClass}">
            favorites
          </button>
        </div>

        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <p class="card__text">${discription}</p>
        </div>
        ${isDateShowing ?
      `<div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${date}</span>
                  <span class="card__time">${time}</span>
                </p>
              </div>
            </div>
          </div>
        </div>`
      : ``}

      </div>
    </div>
  </article>`
  );
};

export {COUNT_CARTS};

export default class Cart extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
  }

  getMarkup() {
    return returnCartMarkup(this._task);
  }

  setEditButtonClickHandler(cb) {
    this.getElement().querySelector(`.card__btn--edit`).addEventListener('click', cb);
  }
}
