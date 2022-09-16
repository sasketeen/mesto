const popupEdit = document.querySelector('.popup_type_edit'),
      popupAdd = document.querySelector('.popup_type_add'),
      popupZoom = document.querySelector('.popup_type_image'),
      formEdit = document.forms.editForm,
      formAdd = document.forms.addForm,
      buttonEdit = document.querySelector('.profile__editButton'),
      buttonAdd = document.querySelector('.profile__addButton'),
      buttonClose = document.querySelectorAll('.popup__closeButton'),
      usernameInput = formEdit.querySelector('.popup__input_type_username'),
      descriptionInput = formEdit.querySelector('.popup__input_type_description'),
      placeNameInput = formAdd.querySelector('.popup__input_type_name'),
      linkInput = formAdd.querySelector('.popup__input_type_link'),
      popupImage = popupZoom.querySelector('.popup__image'),
      popupSubtitle = popupZoom.querySelector('.popup__subtitle'),
      profileName = document.querySelector('.profile__name'),
      profileDescription = document.querySelector('.profile__description'),
      elementsList =  document.querySelector('.elements__list'),
      cardCopy = document.querySelector('.cardCopy');

const createCard = (name, link) => {
  const card = cardCopy.content.cloneNode(true),
        cardImage = card.querySelector('.card__image'),
        cardSubtitle = card.querySelector('.card__subtitle'),
        deleteButton = card.querySelector('.card__buttonDelete'),
        likeButton = card.querySelector('.card__likeButton');
  cardImage.src = link;
  cardImage.alt = name;
  cardSubtitle.textContent = name;
  deleteButton.addEventListener('click', () => { deleteButton.closest('.card').remove() });
  likeButton.addEventListener('click', () => { likeButton.classList.toggle('card__likeButton_active') });
  cardImage.addEventListener('click', (event) => {
                                                    popupImage.src = event.target.src;
                                                    popupImage.alt = event.target.alt;
                                                    popupSubtitle.textContent = event.target.alt;
                                                    openPopup(popupZoom);
                                                  });
  elementsList.prepend(card);
};

const formEditSubmitHandler = (event) => {
  event.preventDefault();
  profileName.textContent = usernameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(event);
};

const formAddSubmitHandler = (event) => {
  event.preventDefault();
  createCard(placeNameInput.value,linkInput.value);
  closePopup(event);
};

const openPopup = (namePopup) => {
  namePopup.classList.add('popup_opened');
};

const closePopup = (event) => {
  const openedPopup = event.target.closest('.popup');
  try {
    openedPopup.querySelector('.popup__form').reset();
  } catch {};
  openedPopup.classList.remove('popup_opened');
};

fetch('../data/initial-cards.json')
.then((response) => {
  return response.json();
})
.then((data) => {
  data.forEach(cardData => { createCard(cardData) });
});

formEdit.addEventListener('submit', formEditSubmitHandler);
formAdd.addEventListener('submit', formAddSubmitHandler);

buttonEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  usernameInput.value = profileName.textContent;
  descriptionInput.value =  profileDescription.textContent;
});
buttonAdd.addEventListener('click', () => { openPopup(popupAdd) });
buttonClose.forEach(button => { button.addEventListener('click', closePopup) });
