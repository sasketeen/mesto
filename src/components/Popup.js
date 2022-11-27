/** Класс, представляющий модальное окно */
export default class Popup {
  /**
   * @param {String} popupSelector - селектор модального окна
   */
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._page = document.querySelector(".page");
  }

  /**
   * Функция открытия модального окна
   */
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._page.classList.add("page_type_openedPopup");
  }

  /**
   * Функция закрытия модального окна
   */
  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.classList.remove("popup_opened");
    this._page.classList.remove("page_type_openedPopup");
  }

  /**
   * Функция становки слушателей
   */
  setEventListeners() {
    this._popup.addEventListener("mousedown", ({ target }) => {
      if (
        target.classList.contains("popup") ||
        target.classList.contains("popup__closeButton")
      ) {
        this.close();
      }
    });
  }

  /**
   * Функция обработки нажатия на esc
   * @param {*} evt - событие
   */
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") this.close();
  };
}
