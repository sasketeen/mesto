import './index.css';
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api';

const buttonEdit = document.querySelector(".profile__editButton");
const buttonAdd = document.querySelector(".profile__addButton");
const formSelectors = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__saveButton",
  disabledButtonClass: "popup_saveButton_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active",
};

/**
 *
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
const formAdd = getFormObj(".addForm");
const formEdit = getFormObj(".editForm");


// создание экземпляра класса Api
const api = new Api("https://mesto.nomoreparties.co/v1/cohort-54", {
  authorization: "7b813897-5964-428c-86c0-44432f9d08b4",
});

// инициализация начальных данных
api
  .getCards()
  .then((result) => {
    cardList.renderItems(result);
  })
  .catch((err) => console.log(err));
api
  .getUserInfo()
  .then((result) => {
    userInfo.setUserInfo(result);
  })
  .catch((err) => console.log(err));

// добавление валидации
formAdd.validator.enableValidation();
formEdit.validator.enableValidation();

// создание экземпляров классов попапа
const popupEdit = new PopupWithForm(".popup_type_edit", (inputsValues) => {
  userInfo.setUserInfo(inputsValues);
  popupEdit.close();
});
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm(".popup_type_add", (inputsValues) => {
  const card = createCard(inputsValues);
  cardList.addItem(card);
  popupAdd.close();
  formAdd.validator.disableButton();
});
popupAdd.setEventListeners();

const popupZoom = new PopupWithImage(".popup_type_image");
popupZoom.setEventListeners();


// создание экземпляра класса секции
const cardList = new Section((cardData) => {
    const card = createCard(cardData);
    cardList.addItem(card);
  },
  ".elements__list"
);

// создание экземпляра класса информации
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__avatar",
});

/**
 *
 * @param {object} cardData - объект содержаший название (поле name) и ссылку (поле link) на картинку
 * @returns {object} заполненный экземпляр карточки
 */
function createCard(cardData) {
  const cardCopy = new Card(cardData, ".cardCopy", (imageData) => { popupZoom.open(imageData) });
  return cardCopy.makeCard();
}

// добавление слушателей
buttonEdit.addEventListener("click", () => {
  popupEdit.setInputsValue(userInfo.getUserInfo());
  popupEdit.open();
  formEdit.validator.resetErrors();
});

buttonAdd.addEventListener("click", () => {
  formAdd.validator.resetErrors();
  popupAdd.open();
});
