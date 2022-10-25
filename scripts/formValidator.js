export default class FormValidator {
  constructor (selectors, form) {
    this._selectors = selectors;
    this._form = form;
  }

  enableValidation() {
    this._setEventListener(this._selectors);
  }

  _setEventListener({inputSelector, submitButtonSelector, disabledButtonClass, ...restSelectors}) {
    this._inputs = Array.from(this._form.querySelectorAll(inputSelector));
    this._button = this._form.querySelector(submitButtonSelector);
    this._toggleButtonSubmit(disabledButtonClass);

    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValid(input, restSelectors);
        this._toggleButtonSubmit(disabledButtonClass);
      })
    })
  }

  _checkValid(input, restSelectors) {
    const errorSpan = this._form.querySelector(`.${input.id}-error`);
    if (!input.validity.valid) {
      this._showError(errorSpan, input, restSelectors)
    }
    else {
      this._hideError(errorSpan, input, restSelectors)
    }
  }

  _showError(span, input, {inputErrorClass, errorClass}) {
    span.classList.add(errorClass);
    span.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
  }

  _hideError(span, input, {inputErrorClass, errorClass}) {
    span.classList.remove(errorClass);
    span.textContent = '';
    input.classList.remove(inputErrorClass);
  }

  _toggleButtonSubmit(disabledButtonClass) {
    if (this._hasInvalidInput()) {
      this._disableButton(disabledButtonClass);
    }
    else {
      this._button.classList.remove(disabledButtonClass);
      this._button.removeAttribute('disabled');
    }
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => {
      return !input.validity.valid
    })
  }

  _disableButton(disabledButtonClass) {
    this._button.classList.add(disabledButtonClass);
    this._button.setAttribute('disabled', true);
  }

  resetErrors = ({inputSelector, disabledButtonClass, ...restSelectors}) => {
    this._inputs.forEach((input) => {
      const errorSpan = form.querySelector(`.${input.id}-error`);
      hideError(errorSpan, input, restSelectors);
    })
    this._toggleButtonSubmit(this._inputs, this._button, disabledButtonClass);
  }
}
