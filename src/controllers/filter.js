import {remove, render, replace} from '../utils/render';
import Filter from '../components/filter';

export default class FilterController {
  constructor(container, taskModel) {
    this._container = container;
    this._taskModel = taskModel;
    this._filters = new Filter(this._taskModel);
    this._rerender = this._filters.rerender;
  }

  render() {
    this._filters.setChangeFilterHandler();
    this._taskModel.setChangeDataHandler(this._rerender);
    render(this._container, this._filters);
  }
}
