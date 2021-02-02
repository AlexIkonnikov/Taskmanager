import AbstractComponent from './abstract-component';

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

export default class Filter extends AbstractComponent {
  constructor(filter) {
    super();
    this._filter = filter;
  }

  getMarkup() {
    return returnFiltersMarkup(this._filter);
  }

  setChangeFilter(cb) {
    this.getElement().addEventListener(`change`, cb);
  }
}
