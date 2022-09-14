const popup = document.querySelector('.popup'),
      form = document.forms.editForm,
      edit = document.querySelector('.profile__editButton'),
      close = popup.querySelector('.popup__closeButton'),
      nameInput = form.querySelector('.popup__input_type_name'),
      descriptionInput = form.querySelector('.popup__input_type_description'),
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
  cardImage.addEventListener('click', openPopup);
  elementsList.prepend(card);
};
const formSubmitHandler = evt => {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closePopup();
};

const openPopup = () => {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    descriptionInput.value =  profileDescription.textContent;
};
const closePopup = () => {
    popup.classList.remove('popup_opened');
};

initialCards.forEach(card => { createCard(card.name, card.link) });

form.addEventListener('submit', formSubmitHandler);
edit.addEventListener('click', openPopup);
close.addEventListener('click', closePopup);
