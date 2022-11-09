import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = this._form.querySelectorAll(".popup__input");
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    this._form.reset();
    super.close();
  }

  _getInputValues() {
    this._inputsValues = {};
    this._inputs.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    });
    return this._inputsValues;
  }
}
