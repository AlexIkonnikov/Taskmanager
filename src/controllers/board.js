export default class BoardController {
  constructor(container) {
    this._container = container;
  }

  render(container, task) {
    const renderTasks = (container, task) => {
      const cartTask = new Cart(task);
      const form = new Form(task);

      const onEscDown = (evt) => {
        if (evt.keyCode === 27) {
          replace(cartTask, form);
          document.removeEventListener(`keydown`, onEscDown);
        }
      };

      const replaceCartToForm = () => {
        replace(form, cartTask);
        document.addEventListener(`keydown`, onEscDown);
      };

      const replaceFormToCart = (evt) => {
        evt.preventDefault();
        replace(cartTask, form);
      };

      cartTask.setEditButtonClickHandler(replaceCartToForm);
      form.setSubmitHandler(replaceFormToCart);

      render(container, cartTask);
    };
  }
}
