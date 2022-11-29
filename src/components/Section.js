/** Класс добвления элементов на страницу */
export default class Section {
  /**
   * @param {Function} renderer - функция отрисовки
   * @param {String} containerSelector - селектор контейнера для отрисовки
   */
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  /**
   * Функция отрисовки начальных данных
   * @param {Array} itemsData - массив начальных данных
   */
  renderItems(itemsData) {
    itemsData.forEach((itemData) => {
      this._renderer(itemData);
    });
  }

  appendItem(item) {
    this._container.append(item);
  }

 /**
  * Функция отрисовки элемента
  * @param {Object} item - элемент
  */
  addItem(item) {
    this._container.prepend(item);
  }
}
