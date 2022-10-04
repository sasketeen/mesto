const popupEdit = document.querySelector('.popup_type_edit');
const formEdit = document.forms.editForm;
const usernameInput = document.querySelector('.popup__input_type_username');
const descriptionInput = document.querySelector('.popup__input_type_description');
const saveButtonPopupEdit = popupEdit.querySelector('.popup__saveButton');

const popupAdd = document.querySelector('.popup_type_add');
const formAdd = document.forms.addForm;
const placeNameInput = document.querySelector('.popup__input_type_name');
const linkInput = document.querySelector('.popup__input_type_link');
const saveButtonPopupAdd = popupAdd.querySelector('.popup__saveButton');

const popupZoom = document.querySelector('.popup_type_image');
const popupImage = popupZoom.querySelector('.popup__image');
const popupSubtitle = popupZoom.querySelector('.popup__subtitle');

const buttonEdit = document.querySelector('.profile__editButton');
const buttonAdd = document.querySelector('.profile__addButton');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const elementsList =  document.querySelector('.elements__list');
const cardCopy = document.querySelector('.cardCopy');
const formSelectors = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__saveButton',
  disabledButtonClass: 'popup_saveButton_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass:'popup__error_active'
};

const createCard = (cardData) => {
  const card = cardCopy.content.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardSubtitle = card.querySelector('.card__subtitle');
  const buttonDelete = card.querySelector('.card__buttonDelete');
  const buttonLike = card.querySelector('.card__likeButton');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardSubtitle.textContent = cardData.name;
  buttonDelete.addEventListener('click', () => { buttonDelete.closest('.card').remove() });
  buttonLike.addEventListener('click', () => { buttonLike.classList.toggle('card__likeButton_active') });
  cardImage.addEventListener('click', (event) => {
    popupImage.src = event.target.src;
    popupImage.alt = event.target.alt;
    popupSubtitle.textContent = event.target.alt;
    openPopup(popupZoom);
  });
  return (card);
}

const renderCard = (cardData, container) => {
  const card = createCard(cardData);
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
  renderCard(cardData, elementsList);
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

const openPopup = (namePopup) => {
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

initialCard.forEach(cardData => { renderCard(cardData, elementsList) });

formEdit.addEventListener('submit', handleFormEditSubmit);
formAdd.addEventListener('submit', handleFormAddSubmit);

buttonEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  usernameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  resetErrors(formEdit, saveButtonPopupEdit, formSelectors);
})

buttonAdd.addEventListener('click', () => { openPopup(popupAdd) });
