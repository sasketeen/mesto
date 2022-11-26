import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._saveButton = this._popup.querySelector('.popup__saveButton');
  }

  setButtonHandler(handler) {
    this._buttonHandler = handler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._saveButton.addEventListener('click', () => {
      this._buttonHandler();
    })
    document.addEventListener('keydown', this._handleEnterClose);
  }

  close() {
    super.close();
    document.removeEventListener('keydown', this._handleEnterClose);
  }

  _handleEnterClose = (evt) => {
    if (evt.key === "Enter") {
      this._buttonHandler();
    }
  }
}
