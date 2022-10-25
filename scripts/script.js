import FormValidator from './formValidator.js'
import Card from './card.js';
import {initialCard} from './initial-cards.js';


const popupEdit = document.querySelector('.popup_type_edit');
const usernameInput = document.querySelector('.popup__input_type_username');
const descriptionInput = document.querySelector('.popup__input_type_description');
const saveButtonPopupEdit = popupEdit.querySelector('.popup__saveButton');

const popupAdd = document.querySelector('.popup_type_add');
const placeNameInput = document.querySelector('.popup__input_type_name');
const linkInput = document.querySelector('.popup__input_type_link');
const saveButtonPopupAdd = popupAdd.querySelector('.popup__saveButton');

const popupZoom = document.querySelector('.popup_type_image');
const popupData = {
  popup: popupZoom,
  popupImage: popupZoom.querySelector('.popup__image'),
  popupSubtitle: popupZoom.querySelector('.popup__subtitle'),
  openPopupFunction: openPopup
}

const buttonEdit = document.querySelector('.profile__editButton');
const buttonAdd = document.querySelector('.profile__addButton');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const elementsList =  document.querySelector('.elements__list');
const formSelectors = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__saveButton',
  disabledButtonClass: 'popup_saveButton_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass:'popup__error_active'
};

const renderCard = (card, container) => {
  container.prepend(card);
}

const handleFormEditSubmit = (event) => {
  event.preventDefault();
  profileName.textContent = usernameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupEdit);
  resetForm(popupEdit);
}

const handleFormAddSubmit = (event) => {
  event.preventDefault();
  const cardData = {
      name: placeNameInput.value,
      link: linkInput.value
  }
  const card = new Card(cardData, '.cardCopy', popupData);
  renderCard(card.makeCard(), elementsList);
  closePopup(popupAdd);
  resetForm(popupAdd);
  disableButton(saveButtonPopupAdd, formSelectors.disabledButtonClass);
}

const closePopupByClick = ({ target }) => {
  if (target.classList.contains('popup') || target.classList.contains('popup__closeButton')) {
    closePopup(target.closest('.popup'));
  }
};

const closePopupByKey = (event) => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(namePopup) {
  namePopup.classList.add('popup_opened');
  window.addEventListener('mousedown', closePopupByClick);
  document.addEventListener('keydown', closePopupByKey);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  window.removeEventListener('mousedown', closePopupByClick);
  document.removeEventListener('keydown', closePopupByKey);
}

const resetForm = (popup) => {
  popup.querySelector('.popup__form').reset();
}

// добавление начальных карточек
initialCard.forEach( cardData => {
  const card = new Card(cardData, '.cardCopy', popupData);
  renderCard(card.makeCard(), elementsList);
});

// добавление валидации

  //функция возвращает объект формы с экземпляром класса валидации
const getFormObj = (selector) => {
  const form = document.querySelector(selector);
  return {
    element: form,
    validator: new FormValidator(formSelectors, form)
  }
}
const formAdd = getFormObj('.addForm');
const formEdit = getFormObj('.editForm');
formAdd.validator.enableValidation();
formEdit.validator.enableValidation();

// добавление слушателей
formEdit.element.addEventListener('submit', handleFormEditSubmit);
formAdd.element.addEventListener('submit', handleFormAddSubmit);

buttonEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  usernameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;

  formEdit.validator.resetErrors(formSelectors);
})

buttonAdd.addEventListener('click', () => { openPopup(popupAdd) });
