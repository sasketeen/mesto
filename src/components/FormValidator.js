/** Класс валидации формы */
export default class FormValidator {
  /**
   * @param {Object} selectors - конфиг объект, содержащий селекторы элементов формы
   * @param {Object} form - элемент формы
   */
  constructor(selectors, form) {
    this._selectors = selectors;
    this._form = form;
  }

  /**
   * Функция активации валидации формы
   */
  enableValidation() {
    this._setEventListener();
  }

  /**
   * Функция услановки слушателей
   */
  _setEventListener() {
    const { inputSelector, submitButtonSelector } = this._selectors;

    this._inputs = Array.from(this._form.querySelectorAll(inputSelector));
    this._button = this._form.querySelector(submitButtonSelector);
    this._toggleButtonSubmit();

    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkValid(input);
        this._toggleButtonSubmit();
      });
    });
  }

  /**
   * Функция проверки валидности ипута
   * @param {Object} input - элемент проверяемого инпута
   */
  _checkValid(input) {
    const errorSpan = this._form.querySelector(`.${input.id}-error`);
    if (!input.validity.valid) {
      this._showError(errorSpan, input);
    } else {
      this._hideError(errorSpan, input);
    }
  }

  /**
   * Функция отображения ошибки
   * @param {Object} span - контейнер для ошибки проверяемого инпута
   * @param {Object} input - элемент проверяемого инпута
   */
  _showError(span, input) {
    const { inputErrorClass, errorClass } = this._selectors;

    span.classList.add(errorClass);
    span.textContent = input.validationMessage;
    input.classList.add(inputErrorClass);
  }

  /**
   * Функция скрытия ошибки
   * @param {Object} span - контейнер для ошибки проверяемого инпута
   * @param {Object} input - элемент проверяемого инпута
   */
  _hideError(span, input) {
    const { inputErrorClass, errorClass } = this._selectors;

    span.classList.remove(errorClass);
    span.textContent = "";
    input.classList.remove(inputErrorClass);
  }

  /**
   * Функция переключения состояния кнопки submit
   */
  _toggleButtonSubmit() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this._enableButton();
    }
  }

  /**
   * Функция проверки валидности формы
   * @returns {Boolen} результат проверки
   */
  _hasInvalidInput() {
    return this._inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  /**
   * Функция отключения кнопки submit
   */
  disableButton() {
    const { disabledButtonClass } = this._selectors;

    this._button.classList.add(disabledButtonClass);
    this._button.setAttribute("disabled", true);
  }

  /**
   * Функция включения кнопки submit
   */
  _enableButton() {
    const { disabledButtonClass } = this._selectors;

    this._button.classList.remove(disabledButtonClass);
    this._button.removeAttribute("disabled");
  }

  /**
   * Функция сброса ошибок формы
   */
  resetErrors() {
    this._inputs.forEach((input) => {
      const errorSpan = this._form.querySelector(`.${input.id}-error`);
      this._hideError(errorSpan, input);
    });
    this._toggleButtonSubmit();
  }
}
