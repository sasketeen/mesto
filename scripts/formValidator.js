export default class FormValidator {
  constructor (selectors, form) {
    this._selectors = selectors;
    this._form = form;
  }

  enableValidation() {
    this._setEventListener();
  }

  _setEventListener() {
    const {
      inputSelector,
      submitButtonSelector,
    } = this._selectors;

    this._inputs = Array.from(this._form.querySelectorAll(inputSelector));
    this._button = this._form.querySelector(submitButtonSelector);
    this._toggleButtonSubmit();

    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValid(input);
        this._toggleButtonSubmit();
      })
    })
  }

  _checkValid(input) {
    const errorSpan = this._form.querySelector(`.${input.id}-error`);
    if (!input.validity.valid) {
      this._showError(errorSpan, input)
    }
    else {
      this._hideError(errorSpan, input)
    }
  }

  _showError(span, input) {
    const {
      inputErrorClass,
      errorClass
    } = this._selectors;

    span.classList.add(errorClass);
    span.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
  }

  _hideError(span, input) {
    const {
      inputErrorClass,
      errorClass
    } = this._selectors;

    span.classList.remove(errorClass);
    span.textContent = '';
    input.classList.remove(inputErrorClass);
  }

  _toggleButtonSubmit() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    }
    else {
      this._enableButton()
    }
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => {
      return !input.validity.valid
    })
  }

  disableButton() {
    const {
      disabledButtonClass
    } = this._selectors;

    this._button.classList.add(disabledButtonClass);
    this._button.setAttribute('disabled', true);
  }

  _enableButton() {
    const {
      disabledButtonClass
    } = this._selectors;

    this._button.classList.remove(disabledButtonClass);
    this._button.removeAttribute('disabled');
  }

  resetErrors() {
    this._inputs.forEach((input) => {
      const errorSpan = this._form.querySelector(`.${input.id}-error`);
      this._hideError(errorSpan, input);
    })
    this._toggleButtonSubmit();
  }
}
