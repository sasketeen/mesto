import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";

let userId;
const buttonEditProfile = document.querySelector(".profile__editButton");
const buttonAddCard = document.querySelector(".profile__addButton");
const buttonEditAvatar = document.querySelector(".profile__avatarButton");

const formSelectors = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__saveButton",
  disabledButtonClass: "popup_saveButton_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active",
};
const apiConfig = {
  serverLink: "https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: "7b813897-5964-428c-86c0-44432f9d08b4",
    "Content-Type": "application/json",
  },
};

//создание объектов форм и активация валидации

/**
 * Функция создания объекта с формой и привязанной к ней валидацией
 * @param {string} selector - селектор формы
 * @returns {object} объект, содержащий форму и экземпляр класса валидатора
 */
const getFormObj = (selector) => {
  const form = document.querySelector(selector);
  return {
    element: form,
    validator: new FormValidator(formSelectors, form),
  };
};
const formAddCard = getFormObj(".addCardForm");
const formEditProfile = getFormObj(".editProfileForm");
const formEditAvatar = getFormObj(".editAvatarForm");
formAddCard.validator.enableValidation();
formEditProfile.validator.enableValidation();
formEditAvatar.validator.enableValidation();

// создание экземпляра класса Api
const api = new Api(apiConfig);

// инициализация начальных данных
Promise.all([api.getCards(), api.getUserInfo()])
  .then(([cardsData, userData]) => {
    userId = userData._id;
    cardList.renderItems(cardsData);
    userInfo.setUserInfo(userData);
  })
  .catch((err) => console.log(err));

// создание экземпляров классов попапа
const popupEditProfile = new PopupWithForm(
  ".popup_type_editProfile",
  (inputsValues) => {
    popupEditProfile.showLoading(true);
    api
      .editUserInfo(inputsValues)
      .then((newUserData) => {
        userInfo.setUserInfo(newUserData);
        popupEditProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupEditProfile.showLoading(false))
  });
popupEditProfile.setEventListeners();

const popupAddCard = new PopupWithForm(
  ".popup_type_addCard",
  (inputsValues) => {
    popupAddCard.showLoading(true);
    api
      .addCard(inputsValues)
      .then((newCardData) => {
        const card = createCard(newCardData);
        cardList.addItem(card);
        popupAddCard.close();
        formAddCard.validator.disableButton();
      })
      .catch((err) => console.log(err))
      .finally(() => popupEditProfile.showLoading(false));
  });
popupAddCard.setEventListeners();

const popupEditAvatar = new PopupWithForm(
  ".popup_type_editAvatar",
  (inputsValues) => {
    popupEditAvatar.showLoading(true);
    api
      .editAvatar(inputsValues)
      .then((newUserData) => {
        userInfo.setUserInfo(newUserData);
        popupEditAvatar.close();
      })
      .catch((err) => console.log(err))
      .finally(() => popupEditAvatar.showLoading(false));
  }
);
popupEditAvatar.setEventListeners();

const popupZoom = new PopupWithImage(".popup_type_image");
popupZoom.setEventListeners();

const popupConfirm = new PopupWithConfirm(".popup_type_confirm");
popupConfirm.setEventListeners();

// создание экземпляра класса секции
const cardList = new Section(
  (cardData) => {
    const item = createCard(cardData);
    cardList.appendItem(item);
  },
  ".elements__list"
);

/**
 * Обработчик клика по картинке
 * @param {object} imageData - данные картинки (link, name)
 */
const handleCardClick = (imageData) => {
  popupZoom.open(imageData);
};

/**
 * Обработчик лайка
 * @param {object} card - экземпляр карточки
 * @param {string} cardId - уникальный id карточки
 */
const handleLikeClick = (card, cardId) => {
  if (card.isLiked()) {
    api
      .removeLike(cardId)
      .then((newCardData) => {
        card.updateLikes(newCardData.likes);
        card.toggleButtonLike();
      })
      .catch((err) => console.log(err));
  } else {
    api
      .addLike(cardId)
      .then((newCardData) => {
        card.updateLikes(newCardData.likes);
        card.toggleButtonLike();
      })
      .catch((err) => console.log(err));
  }
};

/**
 * Обработчик удаления
 * @param {object} card - экземпляр карточки
 * @param {string} cardId - уникальный id карточки
 */
const handleDeleteClick = (card, cardId) => {
  popupConfirm.open();
  popupConfirm.setSubmitHandler(() => {
    popupConfirm.showLoading(true);
    api
      .deleteCard(cardId)
      .then(() => {
        popupConfirm.close();
        card.deleteCard();
      })
      .catch((err) => console.log(err))
      .finally(() => popupConfirm.showLoading(false));
  });
};

/**
 * Функция создания готовой карточки
 * @param {object} cardData - данные карточки
 * @returns {object} заполненный экземпляр карточки
 */
const createCard = (cardData) => {
  const cardCopy = new Card(
    cardData,
    ".cardCopy",
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
    userId
  );
  return cardCopy.makeCard();
};

// создание экземпляра класса информации
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

// добавление слушателей
buttonEditAvatar.addEventListener('click', () => {
  formEditAvatar.validator.resetErrors();
  popupEditAvatar.open();
})

buttonEditProfile.addEventListener("click", () => {
  popupEditProfile.setInputsValue(userInfo.getUserInfo());
  formEditProfile.validator.resetErrors();
  popupEditProfile.open();
});

buttonAddCard.addEventListener("click", () => {
  formAddCard.validator.resetErrors();
  popupAddCard.open();
});
