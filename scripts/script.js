const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupZoom = document.querySelector('.popup_type_image');
const formEdit = document.forms.editForm;
const formAdd = document.forms.addForm;
const buttonEdit = document.querySelector('.profile__editButton');
const buttonAdd = document.querySelector('.profile__addButton');
const buttonClose = document.querySelectorAll('.popup__closeButton');
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
  const card = cardCopy.content.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  const cardSubtitle = card.querySelector('.card__subtitle');
  const buttonDelete = card.querySelector('.card__buttonDelete');
  const buttonLike = card.querySelector('.card__likeButton');
  cardImage.src = link;
  cardImage.alt = name;
  cardSubtitle.textContent = name;
  buttonDelete.addEventListener('click', () => { buttonDelete.closest('.card').remove() });
  buttonLike.addEventListener('click', () => { buttonLike.classList.toggle('card__likeButton_active') });
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

initialCards.forEach(card => { createCard(card.name, card.link) });

formEdit.addEventListener('submit', formEditSubmitHandler);
formAdd.addEventListener('submit', formAddSubmitHandler);

buttonEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  usernameInput.value = profileName.textContent;
  descriptionInput.value =  profileDescription.textContent;
});
buttonAdd.addEventListener('click', () => { openPopup(popupAdd) });
buttonClose.forEach(button => { button.addEventListener('click', closePopup) });
