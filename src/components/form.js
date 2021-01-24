import {colors, days} from '../mock/task';
import {formatTime, formatDate} from '../utils/common';
import SmartComponent from './smart';
import flatpickr from 'flatpickr';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const returnFormMarkup = (task) => {
  const {discription, dueDate, color, repeatingDays, isRepeating, isDateSet} = task;
  const repeatingClass = isRepeating ? `card--repeat` : ``;
  const isDateShowing = !!dueDate && !isRepeating;
  const date = isDateShowing ? formatDate(dueDate) : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;
  const deadLineClass = dueDate && dueDate < Date.now() && !isRepeating ? `card--deadline` : ``;

  const returnColorsMarkup = (colorsArray, activeColor) => {
    return colorsArray.map((it, index) => {
      return (`<input
      type="radio"
      id="color-${it}-${index}"
      class="card__color-input card__color-input--${it} visually-hidden"
      name="color"
      value="${it}"
      ${activeColor === it ? `checked` : ``}
      />
      <label
        for="color-${it}-${index}"
        class="card__color card__color--${it}"
        >${it}</label
      >`);
    })
    .join(`\n`);
  };

  const returnRepeatDaysMarkup = (daysArray, repeatingDaysArray) => {
    return daysArray
    .map((it, index) => {
      return (
        `<input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${it}-${index}"
          name="repeat"
          value="${it}"
          ${repeatingDaysArray[it] ? `checked` : ``}
          />
          <label class="card__repeat-day" for="repeat-${it}-${index}"
            >${it}</label
          >`);
    }).join(`\n`);
  };

  return (
    `<article class="card card--edit card--${color} ${repeatingClass} ${deadLineClass}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>

        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >${discription}</textarea>
          </label>
        </div>

        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${isDateSet && !isRepeating ? `yes` : `no`}</span>
              </button>
              ${isDateSet && !isRepeating ?
      `<fieldset class="card__date-deadline">
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder=""
                    name="date"
                    value="${date} ${time}"
                  />
                </label>
        </fieldset>` : ``
    }
              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${isRepeating ? `yes` : `no`}</span>
              </button>
              ${isRepeating ? `
              <fieldset class="card__repeat-days">
                <div class="card__repeat-days-inner">
                  ${returnRepeatDaysMarkup(days, repeatingDays)}
                </div>
              </fieldset>
              ` : ``}
            </div>
          </div>

          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
              ${returnColorsMarkup(colors, color)}
            </div>
          </div>
        </div>

        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`
  );
};

export default class Form extends SmartComponent {
  constructor(task) {
    super();
    this._task = task;
    this._isRepeating = this._task.isRepeating;
    this._dueDate = this._task.dueDate;
    this._repeatingDays = this._task.repeatingDays;
    this._days = [];
    this._submitHandler = null;
    this._flatpickr = null;

    this.subscribeOnEvents();
    this._setFlatpickr();
    this._isButtonDesabled();
  }

  _isButtonDesabled() {
    if (this._task.isRepeating === false) {
      return;
    }

    const button = this.getElement().querySelector(`.card__save`);
    button.setAttribute(`disabled`, true);
    this._days = this.getElement().querySelectorAll(`.card__repeat-day-input`);

    this._days.forEach((day) => {
      if(day.checked) {
        button.removeAttribute(`disabled`);
      }
    });
  }


  _setFlatpickr() {

    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    if (this._task.isDateSet && !this._task.isRepeating) {
      const calendar = this.getElement().querySelector(`.card__date`);
      this._flatpickr = flatpickr(calendar, {
        enableTime: true,
        dateFormat: "d F H:i",
      });
    }
  }

  reset() {
    this._task.isRepeating = !!this._isRepeating;
    this._task.dueDate = !!this._dueDate;
  }

  rerender() {
    super.rerender();
    this._setFlatpickr();
    this._isButtonDesabled();
  }

  getMarkup() {
    return returnFormMarkup(this._task);
  }

  recoveryListners() {
    this.setSubmitHandler(this._submitHandler);
    this.subscribeOnEvents();
  }

  subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, () => {
      this._task.isRepeating = !this._task.isRepeating;
      this.rerender();
    });

    element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, () => {
      this._task.isDateSet = !this._task.isDateSet;
      this.rerender();
    });

    element.querySelectorAll(`.card__color-input`).forEach((color) => {
      color.addEventListener(`change`, (evt) => {
        this._task.color = evt.target.value;
        this.rerender();
      });
    });

    element.querySelectorAll(`.card__repeat-day-input`).forEach((day) => {
      day.addEventListener(`change`, (evt) => {
        this._repeatingDays[evt.target.value] = !this._repeatingDays[evt.target.value];
        this.rerender();
      });
    });
  }

  setSubmitHandler(cb) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, cb);
    this._submitHandler = cb;
  }
}
