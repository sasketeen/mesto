export default class Section {
  constructor({ items, renderer }, containerSelector) {
    // this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // функция отрисовки начальных карточек
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  // функция отрисовки 1 карточки
  addItem(item) {
    this._container.prepend(item);
  }
}
