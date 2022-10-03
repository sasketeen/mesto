const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupZoom = document.querySelector('.popup_type_image');
const formEdit = document.forms.editForm;
const formAdd = document.forms.addForm;
const buttonEdit = document.querySelector('.profile__editButton');
const buttonAdd = document.querySelector('.profile__addButton');
const buttonsClose = document.querySelectorAll('.popup__closeButton');
const usernameInput = formEdit.querySelector('.popup__input_type_username');
const descriptionInput = formEdit.querySelector('.popup__input_type_description');
const placeNameInput = formAdd.querySelector('.popup__input_type_name');
const linkInput = formAdd.querySelector('.popup__input_type_link');
const popupImage = popupZoom.querySelector('.popup__image');
const popupSubtitle = popupZoom.querySelector('.popup__subtitle');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const elementsList =  document.querySelector('.elements__list');
const cardCopy = document.querySelector('.cardCopy');
const selectors = {inputSelector: '.popup__input',
                   submitButtonSelector: '.popup__saveButton',
                   disabledButtonClass: 'popup_saveButton_disabled',
                   inputErrorClass: 'popup__input_type_error',
                   errorClass:'popup__error_active'};

const createCard = (cardData) => {
  const card = cardCopy.content.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardSubtitle = card.querySelector('.card__subtitle');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardSubtitle.textContent = cardData.name;
  return (card);
}

const renderCard = (cardData) => {
  const card = createCard(cardData);
  elementsList.prepend(card);
}

const handleFormEditSubmit = (event) => {
  event.preventDefault();
  profileName.textContent = usernameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(event.target.closest('.popup'));
}

const handleFormAddSubmit = (event) => {
  event.preventDefault();
  const cardData = {
      name: placeNameInput.value,
      link: linkInput.value
  }
  const button = event.target.querySelector('.popup__saveButton');
  renderCard(cardData);
  closePopup(event.target.closest('.popup'));
  disableButton(button, selectors.disabledButtonClass);
}

const closePopupByClick = ({ target }) => {
  if (target.classList.contains('popup') || target.classList.contains('popup__closeButton')) {
    closePopup(target.closest('.popup'));
    window.removeEventListener('mousedown', closePopupByClick);
    document.removeEventListener('keydown', closePopupByKey);
  }
};

const closePopupByKey = (event) => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
    window.removeEventListener('mousedown', closePopupByClick);
    document.removeEventListener('keydown', closePopupByKey);
  }
}

const openPopup = (namePopup) => {
  namePopup.classList.add('popup_opened');
  window.addEventListener('mousedown', closePopupByClick);
  document.addEventListener('keydown', closePopupByKey);
}

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  resetForm(popup);
}

const resetForm = (popup) => {
  popup.querySelector('.popup__form').reset();
  const inputs = Array.from(popup.querySelectorAll('.popup__input'));
  inputs.forEach((input) => {
    const errorSpan = popup.querySelector(`.${input.id}-error`);
    hideError(errorSpan, input, selectors);
  })
}

const disableButton = (button, disabledButtonClass) => {
  button.classList.add(disabledButtonClass);
  button.setAttribute('disabled', true);
}
initialCard.forEach(cardData => { renderCard(cardData) });

formEdit.addEventListener('submit', handleFormEditSubmit);
formAdd.addEventListener('submit', handleFormAddSubmit);

buttonEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  usernameInput.value = profileName.textContent;
  descriptionInput.value =  profileDescription.textContent;
})

buttonAdd.addEventListener('click', () => { openPopup(popupAdd) });

elementsList.addEventListener('click', ({ target }) => {
  if (target.classList.contains('card__buttonDelete')) {
    target.closest('.card').remove();
  }
  if (target.classList.contains('card__likeButton')) {
    target.classList.toggle('card__likeButton_active');
  }
  if (target.classList.contains('card__image')) {
    popupImage.src = target.src;
    popupImage.alt = target.alt;
    popupSubtitle.textContent = target.alt;
    openPopup(popupZoom);
  }
})
