import {remove, render, replace} from '../utils/render';
import Filter from '../components/filter';

export default class FilterController {
  constructor(container, taskModel) {
    this._container = container;
    this._taskModel = taskModel;
  }

  render(filters) {
    const filter = new Filter(filters);

    filter.setChangeFilter((evt) => {
      this._taskModel._filtertype = evt.target.dataset.type;
      this._taskModel.changeFilter();
    });
    render(this._container, filter);
  }
}
