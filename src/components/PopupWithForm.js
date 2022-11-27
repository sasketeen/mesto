import Popup from "./Popup.js";
/**
 * Класс, представляющий модальное окно с формой
 * @extends Popup
 */
export default class PopupWithForm extends Popup {
  /**
   * @param {String} popupSelector - селектор модального окна
   * @param {Function} handleFormSubmit - функция обработки submit
   */
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll(".popup__input");
    this._button = this._popup.querySelector(".popup__saveButton");
  }

  /**
   * Функция установки слушателей
   */
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  /**
   * Функция установки данных в инпуты
   * @param {Object} data - объект с данными, в котором ключ соответсвует имени инпута
   */
  setInputsValue(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  /**
   * Функция отрисовки сообщения при отправке данных на сервер
   * @param {Boolean} isLoading - флаг состояния отправки
   */
  showLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = "Сохранение...";
    } else {
      this._button.textContent = "Сохранить";
    }
  }

  /**
   * Функция закрытия модального окна
   */
  close() {
    this._form.reset();
    super.close();
  }

  /**
   * Функция сбора данных из инпутов
   * @returns {Object} объект с данными, в котором ключ соответсвует имени инпута
   */
  _getInputValues() {
    this._inputsValues = {};
    this._inputs.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    });
    return this._inputsValues;
  }
}
