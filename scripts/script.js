import FormValidator from './FormValidator.js'
import Card from './Card.js';
import Section from './Section.js';
import {initialCards} from './initial-cards.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

const page = document.querySelector('.page');

const popupEdit = document.querySelector('.popup_type_edit');
const usernameInput = document.querySelector('.popup__input_type_username');
const descriptionInput = document.querySelector('.popup__input_type_description');

// const popupEdit = new PopupWithForm(".popup_type_edit", (inputsValues) => {
//   profileName.textContent = usernameInput.value;
//   profileDescription.textContent = descriptionInput.value;
//   popupEdit.close();
// });

// const popupAdd = document.querySelector('.popup_type_add');
// const placeNameInput = document.querySelector('.popup__input_type_name');
// const linkInput = document.querySelector('.popup__input_type_link');
const popupAdd = new PopupWithForm(".popup_type_add", (inputsValues) => {
  const card = new Card(inputsValues, ".cardCopy", handleOpenImagePopup);
  cardList.addItem(card.makeCard());
  // renderCard(card.makeCard(), elementsList);
  popupAdd.close();
  // resetForm(formAdd);
  formAdd.validator.disableButton();
});
popupAdd.setEventListeners();

const popupZoom = new PopupWithImage(".popup_type_image");
popupZoom.setEventListeners();
// const popupImage = popupZoom.querySelector('.popup__image');
// const popupSubtitle = popupZoom.querySelector('.popup__subtitle');


const buttonEdit = document.querySelector('.profile__editButton');
const buttonAdd = document.querySelector('.profile__addButton');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
// const elementsList =  document.querySelector('.elements__list');

const formSelectors = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__saveButton',
  disabledButtonClass: 'popup_saveButton_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass:'popup__error_active'
};

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

// const renderCard = (card, container) => {
//   container.prepend(card);
// }

const handleFormEditSubmit = (event) => {
  event.preventDefault();
  profileName.textContent = usernameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupEdit);
  resetForm(formEdit);
}

// const handleFormAddSubmit = (event, inputsData) => {
//   event.preventDefault();
//   const cardData = {
//       name: placeNameInput.value,
//       link: linkInput.value
//   }

//   const card = new Card(cardData, '.cardCopy', handleOpenImagePopup);
//   renderCard(card.makeCard(), elementsList);
//   closePopup(popupAdd);
//   resetForm(formAdd);
//   formAdd.validator.disableButton();
// }

const handleOpenImagePopup = (imageData) => {
  popupZoom.open(imageData);
  // popupImage.src = imageData.link;
  // popupImage.alt = imageData.name;
  // popupSubtitle.textContent = imageData.name;
  // openPopup(popupZoom);
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
  page.classList.add('page_type_openedPopup');
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  window.removeEventListener('mousedown', closePopupByClick);
  document.removeEventListener('keydown', closePopupByKey);
  page.classList.remove('page_type_openedPopup');
}

const resetForm = (form) => {
  form.element.reset();
}

// добавление начальных карточек

// initialCards.forEach( cardData => {
//   const card = new Card(cardData, '.cardCopy', handleOpenImagePopup);
//   renderCard(card.makeCard(), elementsList);
// });

const cardList = new Section({items: initialCards, renderer:(cardData) => {
  const copycard = new Card(cardData, ".cardCopy", handleOpenImagePopup);
  cardList.addItem(copycard.makeCard());
}}, ".elements__list");
cardList.renderItems();
// добавление валидации

// formAdd.validator.enableValidation();
// formEdit.validator.enableValidation();

// добавление слушателей
formEdit.element.addEventListener('submit', handleFormEditSubmit);
// formAdd.element.addEventListener('submit', handleFormAddSubmit);

buttonEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  usernameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  formEdit.validator.resetErrors();
})

buttonAdd.addEventListener('click', () => { popupAdd.open() });
