/** Класс, представляющий карточку с картинкой */
export default class Card {
  /**
   * @param {Object} param0 - объект с данными карточки,
   * name - название, link - ссылка на кртинку, _id - уникальный id, owner - бъект с данными автора, likes - массив лайкнувших пользователей
   * @param {String} templateSelector - селектор шаблона карточки
   * @param {Function} handleCardClick - функция обработки клика по фото
   * @param {Function} handleLikeClick - функция обработки лайка
   * @param {Function} handleDeleteClick - функция обработки удаления
   * @param {String} userId - id текущего пользователя
   */
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

  /**
   * Функция создания экземпляра готовой карточки
   * @returns {Object} готовая карточка
   */
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
    this.updateLikes(this._likes)

    return this._card;
  }

  /**
   * Функция удаления карточки из разметки
   */
  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  /**
   * Функция переключения отображеия кнопки лайка
   */
  toggleButtonLike() {
    this.isLiked()
      ? this._buttonLike.classList.add("card__likeButton_active")
      : this._buttonLike.classList.remove("card__likeButton_active");
  }

  /**
   * Функция обновления лайков
   * @param {Array} likes - массив лайкнувших пользователей
   */
  updateLikes(likes) {
    this._likes = likes;
    this._likeCounter.textContent = likes.length;
    this.toggleButtonLike();
  }

  /**
   * Функция проверки наличия лайка карточки текущим пользователем
   * @returns {Boolean} результат проверки
   */
  isLiked() {
    return this._likes.some((userlike) => userlike._id === this._userId);
  }

  /**
   * Функция копиования шаблока карточки
   * @returns {Object} пустая копия шаблона карточки
   */
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  /**
   * Функция установки слушателей
   */
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
      this._handleOpenImagePopup({
        link: this._link,
        name: this._name,
      });
    });
  }

  /**
   * Функция проверки автора карточки
   * @returns {Boolean} результат проверки
   */
  _isOwner() {
    return this._ownerId === this._userId ? true : false;
  }
}

