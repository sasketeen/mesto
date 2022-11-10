export default class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._handleOpenImagePopup = handleCardClick;
  }

  // функция настройки и заполнения карточки данными. Возвращает готовую карточку
  makeCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(".card__image");
    const cardSubtitle = this._card.querySelector(".card__subtitle");
    this._cardImage.src = this._cardData.link;
    this._cardImage.alt = this._cardData.name;
    cardSubtitle.textContent = this._cardData.name;
    this._setEventListeners();
    return this._card;
  }

  // функция поиска и копирвания шаблона карточки. Возвращает пустой шаблон карточки
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  // функция установки слушателей в карточке
  _setEventListeners() {
    const buttonDelete = this._card.querySelector(".card__buttonDelete");
    this._buttonLike = this._card.querySelector(".card__likeButton");

    buttonDelete.addEventListener("click", () => {
      this._handleDeleteClick();
    });
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeClick();
    });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  // функция обработки клика по кнопке удаления
  _handleDeleteClick() {
    this._card.remove();
    this._card = null;
  }

  // функция обработки клика по кнопке лайка
  _handleLikeClick() {
    this._buttonLike.classList.toggle("card__likeButton_active");
  }
  // функция обработки клика по фото
  _handleImageClick() {
    this._handleOpenImagePopup({
      link: this._cardData.link,
      name: this._cardData.name,
    });
  }
}
