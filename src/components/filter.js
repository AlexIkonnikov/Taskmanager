import SmartComponent from './smart';

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

const returnFiltersMarkup = (filter) => {
  const filterMarkup = filter.map((it, i) => returnFilterMarkup(it, i === 0)).join(`\n`);
  return (
    `<section class="main__filter filter container">
    ${filterMarkup}
    </section>`
  );
};

export default class Filter extends SmartComponent {
  constructor(filter, taskModel) {
    super();
    this._filter = filter;
    this._taskModel = taskModel;
  }

  rerender() {
    super.rerender();
  }

  recoveryListners() {
    this.setChangeFilter();
  }

  getMarkup() {
    return returnFiltersMarkup(this._filter);
  }

  setChangeFilterHandler() {
    this.getElement().addEventListener(`change`, (evt) => {
      this._taskModel._filtertype = evt.target.dataset.type;
      this._taskModel.changeActiveFilter();
      this.rerender();
    });
  }
}
