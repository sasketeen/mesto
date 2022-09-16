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

const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/card__img1.jpg'
  },
  {
    name: 'Нижний Новгород',
    link: './images/card__img2.jpg'
  },
  {
    name: 'Санкт-Петербург',
    link: './images/card__img3.jpg'
  },
  {
    name: 'Кунгурская ледяная пещера',
    link: './images/card__img4.jpg'
  },
  {
    name: 'Маньпупунёр',
    link: './images/card__img5.jpg'
  },
  {
    name: 'Ленские столбы',
    link: './images/card__img6.jpg'
  }
];

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

const handleFormEditSubmit = (event) => {
  event.preventDefault();
  profileName.textContent = usernameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(event);
};

const handleFormAddSubmit = (event) => {
  event.preventDefault();
  createCard(placeNameInput.value,linkInput.value);
  closePopup(event);
  resetForm(event);
};

const openPopup = (namePopup) => {
  namePopup.classList.add('popup_opened');
};

const closePopup = (event) => {
  const openedPopup = event.target.closest('.popup');
  // try {
  //   openedPopup.querySelector('.popup__form').reset();
  // } catch {};
  openedPopup.classList.remove('popup_opened');
};

const resetForm = (event) => {
  const popup = event.target.closest('.popup');
  popup.querySelector('.popup__form').reset();
};

initialCards.forEach(card => { createCard(card.name, card.link) });

formEdit.addEventListener('submit', handleFormEditSubmit);
formAdd.addEventListener('submit', handleFormAddSubmit);

buttonEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  usernameInput.value = profileName.textContent;
  descriptionInput.value =  profileDescription.textContent;
});
buttonAdd.addEventListener('click', () => { openPopup(popupAdd) });
buttonClose.forEach(button => { button.addEventListener('click', closePopup) });
