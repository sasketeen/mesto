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
    this._saveButton = this._popup.querySelector(".popup__saveButton");
  }

  /**
   * Функция задания колбека для слушателя нажатия на кнопку
   * @param {Function} handler - функция обработчик
   */
  setButtonHandler(handler) {
    this._buttonHandler = handler;
  }

  /**
   * Функция установки слушателей
   */
  setEventListeners() {
    super.setEventListeners();
    this._saveButton.addEventListener("click", () => {
      this._buttonHandler();
    });
    document.addEventListener("keydown", this._handleEnterClose);
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

  /**
   * Функция обработки нажатия на Enter
   * @param {*} evt - событие
   */
  _handleEnterClose = (evt) => {
    if (evt.key === "Enter") {
      this._buttonHandler();
    }
  };
}
