export default class Card {
  constructor(
    { name, link, _id, owner, likes },
    templateSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
    userId
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._ownerId = owner._id;
    this._likes = likes;
    this._templateSelector = templateSelector;
    this._userId = userId;

    this._handleOpenImagePopup = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  // функция настройки и заполнения карточки данными. Возвращает готовую карточку
  makeCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(".card__image");
    const cardSubtitle = this._card.querySelector(".card__subtitle");
    this._buttonLike = this._card.querySelector(".card__likeButton");
    this._buttonDelete = this._card.querySelector(".card__buttonDelete");
    this._likeCounter = this._card.querySelector(".card__likeCounter");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    cardSubtitle.textContent = this._name;
    this._setEventListeners();
    this.updateLikes(this._likes);

    if (!this._isOwner()) {
      this._buttonDelete.remove();
      this._buttonDelete = null;
    }
    if (this._likes.some((user) => user._id === this._userId)) {
      this.toggleButtonLike();
    }
    return this._card;
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  toggleButtonLike() {
    this._buttonLike.classList.toggle("card__likeButton_active");
  }

  updateLikes(likes) {
    this._likeCounter.textContent = likes.length;
  }

  isLiked() {
    return this._buttonLike.classList.contains("card__likeButton_active")
      ? true
      : false;
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
    if (this._isOwner()) {
      this._buttonDelete.addEventListener("click", () => {
        this._handleDeleteClick(this, this._id);
      });
    }
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeClick(this, this._id);
    });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick();
    });
  }

  _isOwner() {
    return this._ownerId === this._userId ? true : false;
  }

  // функция обработки клика по фото
  _handleImageClick() {
    this._handleOpenImagePopup({
      link: this._link,
      name: this._name,
    });
  }
}

