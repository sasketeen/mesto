import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { initialCards } from "../utils/initial-cards.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const buttonEdit = document.querySelector(".profile__editButton");
const buttonAdd = document.querySelector(".profile__addButton");
const formSelectors = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__saveButton",
  disabledButtonClass: "popup_saveButton_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active",
};

//функция возвращает объект формы с экземпляром класса валидации
const getFormObj = (selector) => {
  const form = document.querySelector(selector);
  return {
    element: form,
    validator: new FormValidator(formSelectors, form),
  };
};
const formAdd = getFormObj(".addForm");
const formEdit = getFormObj(".editForm");

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
  renderCard(inputsValues);
  popupAdd.close();
  formAdd.validator.disableButton();
});
popupAdd.setEventListeners();

const popupZoom = new PopupWithImage(".popup_type_image");
popupZoom.setEventListeners();


// создание экземпляра класса секции
const cardList = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".elements__list"
);

// создание экземпляра класса информации
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
})

// функция рендеринга карточек
function renderCard(cardData) {
  const copycard = new Card(cardData, ".cardCopy", (imageData) => { popupZoom.open(imageData) });
  cardList.addItem(copycard.makeCard());
}

// добавление начальных карточек
cardList.renderItems();

// добавление слушателей
buttonEdit.addEventListener("click", () => {
  popupEdit.open();
  popupEdit.setInputsValue(userInfo.getUserInfo());
  formEdit.validator.resetErrors();
});

buttonAdd.addEventListener("click", () => {
  formAdd.validator.resetErrors();
  popupAdd.open();
});
