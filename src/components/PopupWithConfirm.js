import Popup from "./Popup.js";
/**
 * Класс, представляющий модальное окно с подтверждением
 * @extends Popup
 */
export default class PopupWithConfirm extends Popup {
  /**
   * @param {string} popupSelector - селектор модального окна
   */
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._saveButton = this._popup.querySelector(".popup__saveButton");
  }

  /**
   * Функция задания колбека для слушателя нажатия на кнопку
   * @param {Function} handler - функция обработчик
   */
  setSubmitHandler(handler) {
    this._submitHandler = handler;
  }

  /**
   * Функция установки слушателей
   */
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._submitHandler();
    });
  }

  /**
   * Функция закрытия модального окна
   */
  close() {
    super.close();
    document.removeEventListener("keydown", this._handleEnterClose);
  }

  /**
   * Функция отрисовки сообщения при отправке данных на сервер
   * @param {Boolean} isLoading - флаг состояния отправки
   */
  showLoading(isLoading) {
    if (isLoading) {
      this._saveButton.textContent = "Удаление...";
    } else {
      this._saveButton.textContent = "Да";
    }
  }
}
