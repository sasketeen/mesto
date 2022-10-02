const enableValidation = (selectors) => {
  const forms = Array.from(document.forms);
  forms.forEach((form) => {
    setEventListener(form, selectors);
  });
};

const setEventListener = (form, {inputSelector, submitButtonSelector, disabledButtonClass, ...restSelectors}) => {
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  const button = form.querySelector(submitButtonSelector);
  toggleButtonSubmit(inputs, button, disabledButtonClass);

  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      checkValid(form, input, restSelectors);
      toggleButtonSubmit(inputs, button, disabledButtonClass);
    });
  });
};

const checkValid = (form, input, restSelectors) => {
  const errorSpan = form.querySelector(`.${input.id}-error`);
  if (!input.validity.valid) {
    showError(errorSpan, input, restSelectors)
  }
  else {
    hideError(errorSpan, input, restSelectors)
  };
};

const showError = (span, input, {inputErrorClass, errorClass}) => {
  span.classList.add(errorClass);
  span.textContent = input.validationMessage;
  input.classList.add(inputErrorClass);
};

const hideError = (span, input, {inputErrorClass, errorClass}) => {
  span.classList.remove(errorClass);
  span.textContent = '';
  input.classList.remove(inputErrorClass);
};

const toggleButtonSubmit = (inputs, button, disabledButtonClass) => {
  if (hasInvalidInput(inputs)) {
    disableButton(button, disabledButtonClass);
  }
  else {
    button.classList.remove(disabledButtonClass);
    button.removeAttribute('disabled');
  }
};

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid
  })
};

enableValidation(selectors);
