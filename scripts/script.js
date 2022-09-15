const popup = document.querySelector('.popup'),
      popupEdit = document.querySelector('.popup_type_edit'),
      popupAdd = document.querySelector('.popup_type_add'),
      formEdit = document.forms.editForm,
      buttonEdit = document.querySelector('.profile__editButton'),
      buttonAdd = document.querySelector('.profile__addButton'),
      buttonClose = document.querySelectorAll('.popup__closeButton'),
      nameInput = formEdit.querySelector('.popup__input_type_name'),
      descriptionInput = formEdit.querySelector('.popup__input_type_description'),
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
  // cardImage.addEventListener('click', openPopup(popupEdit));
  elementsList.prepend(card);
};
const formEditSubmitHandler = (evt) => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup();
};

const openPopup = (namePopup) => {
  namePopup.classList.add('popup_opened');
};

const closePopup = (event) => {
  const openedPopup = event.target.closest('.popup');
  openedPopup.querySelector('.popup__form').reset();
  openedPopup.classList.remove('popup_opened');
};

initialCards.forEach(card => { createCard(card.name, card.link) });

formEdit.addEventListener('submit', formEditSubmitHandler);
buttonEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  descriptionInput.value =  profileDescription.textContent;
});
buttonAdd.addEventListener('click', () => { openPopup(popupAdd) });
buttonClose.forEach(button => { button.addEventListener('click', closePopup) });
