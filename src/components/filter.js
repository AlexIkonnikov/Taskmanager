import SmartComponent from './smart';
import {generateFilters} from '../mock/filter';

const returnFilterMarkup = (filter, isChecked) => {
  const {name, count} = filter;
  return (
    `<input
    type="radio"
    id="filter__${name}"
    class="filter__input visually-hidden"
    name="filter"
    data-type="${name}"
    ${count === 0 ? `disabled` : ``}
    ${isChecked ? `checked` : ``}
    />
    <label for="filter__${name}" class="filter__label">
    ${name} <span class="filter__${name}-count">${count}</span></label
    >`
  );
};

const returnFiltersMarkup = (filters) => {
  const filterMarkup = filters.map((it, i) => returnFilterMarkup(it, i === 0)).join(`\n`);
  return (
    `<section class="main__filter filter container">
    ${filterMarkup}
    </section>`
  );
};

export default class Filter extends SmartComponent {
  constructor(taskModel) {
    super();
    this._taskModel = taskModel;
    this.rerender = this.rerender.bind(this);
  }

  getFilterInfo() {
    return generateFilters(this._taskModel.getAllTasks());
  }

  rerender() {
    super.rerender();
  }

  recoveryListners() {
    this.setChangeFilterHandler();
  }

  getMarkup() {
    return returnFiltersMarkup(this.getFilterInfo());
  }

  setChangeFilterHandler() {
    this.getElement().querySelectorAll(`input`).forEach((it) => {
      it.addEventListener(`change`, (evt) => {
        this._taskModel.changeActiveFilter(evt.target.dataset.type);
      });
    });
  }
}
