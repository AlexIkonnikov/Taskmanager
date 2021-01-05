import {colors, mounths, days} from '../mock/task';
import {createElement, formatTime} from '../utils';

const returnFormMarkup = (task) => {
  const {discription, dueDate, color, repeatingDays, isRepeating} = task;
  const repeatingClass = isRepeating ? `card--repeat` : ``;
  const isDateShowing = !!dueDate && !isRepeating;
  const deadLineClass = dueDate && dueDate < Date.now() && !isRepeating ? `card--deadline` : ``;
  const date = isDateShowing ? `${dueDate.getDate()} ${mounths[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

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
                date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
              </button>
              ${isDateShowing ?
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

export default class Form {
  constructor(task) {
    this._task = task;
    this._element = null;
  }

  getMarkup() {
    return returnFormMarkup(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getMarkup());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
