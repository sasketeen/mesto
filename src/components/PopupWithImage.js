import Popup from "./Popup.js";
/**
 * Класс, представляющий модальное окно с изображением
 * @extends Popup
 */
export default class PopupWithImage extends Popup {
  /**
   * @param {String} popupSelector - селектор модального окна
   */
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupSubtitle = this._popup.querySelector(".popup__subtitle");
  }

  /**
   * Функция открытия модального окна
   * @param {Object} объект, содержащий данные изображения, link - ссылка на изображение, name - название изображения
   */
  open({ link, name }) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupSubtitle.textContent = name;
    super.open();
  }
}
