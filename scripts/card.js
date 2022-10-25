export default class Card {
  constructor (cardData, templateSelector, popupData) {
    this._cardData = cardData;
    this._templateSelector = templateSelector;
    this._popupData = popupData;
  }

  // функция настройки и заполнения карточки данными. Возвращает готовую карточку
  makeCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.card__image');
    const cardSubtitle = this._card.querySelector('.card__subtitle');
    this._cardImage.src = this._cardData.link;
    this._cardImage.alt = this._cardData.name;
    cardSubtitle.textContent =  this._cardData.name;
    this._setEventListeners();
    return  this._card;
  }

  // функция поиска и копирвания шаблона карточки. Возвращает пустой шаблон карточки
  _getTemplate() {
    return (
      document.querySelector(this._templateSelector).content.cloneNode(true)
    );
  }

  // функция установки слушателей на кнопки в карточке
  _setEventListeners() {
    const buttonDelete = this._card.querySelector('.card__buttonDelete');
    const buttonLike = this._card.querySelector('.card__likeButton');

    buttonDelete.addEventListener('click', () => { buttonDelete.closest('.card').remove() });
    buttonLike.addEventListener('click', () => { buttonLike.classList.toggle('card__likeButton_active') });
    this._cardImage.addEventListener('click', () => { this._handleImageClick() });
  }

  // функция обработки клика по фото
  _handleImageClick() {
    this._popupData.popupImage.src = this._cardImage.src;
    this._popupData.popupImage.alt = this._cardImage.alt;
    this._popupData.popupSubtitle.textContent = this._cardImage.alt;
    this._popupData.openPopupFunction(this._popupData.popup);
  }
}

