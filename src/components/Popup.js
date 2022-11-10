export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._page = document.querySelector(".page");
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
    this._page.classList.add("page_type_openedPopup");
  }

  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.classList.remove("popup_opened");
    this._page.classList.remove("page_type_openedPopup");
  }

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

  // функция-обработчик закрытия по esc
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") this.close();
  };
}
