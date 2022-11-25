export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // функция отрисовки начальных карточек
  renderItems(itemsData) {
    itemsData.forEach((itemData) => {
      const item = this._renderer(itemData);
      this._container.append(item)
    });
  }

  // функция отрисовки 1 карточки
  addItem(item) {
    this._container.prepend(item);
  }
}
