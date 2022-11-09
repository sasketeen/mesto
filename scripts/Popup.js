export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    document.removeEventListener("keydown", this._handleEscClose);
    this._popup.classList.remove("popup_opened");
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

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") this.close();
  };
}
