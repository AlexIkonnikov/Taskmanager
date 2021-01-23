import AbstractComponent from './abstract-component';

export default class SmartComponent extends AbstractComponent {

  recoveryListners() {
    throw new Error(`Abstract method not implemented: recoveryListners`);
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();
    parent.replaceChild(newElement, oldElement);
    this.recoveryListners();
  }
}
