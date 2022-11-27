/** Класс сбора и задания данных пользователя */
export default class UserInfo {
  /**
   * @param {object} объект с селекторами элеметов данных пользователя,
   * nameSelector - селектор элемента имени, descriptionSelector - селектор элемента описания, avatarSelector селектор элемента аватара
   */
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._username = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  /**
   * Функция сбора информации пользователя со страницы
   * @returns {Object} объект, содержащий текущее имя и описание пользователя
   */
  getUserInfo() {
    return {
      username: this._username.textContent,
      description: this._description.textContent,
    };
  }

  /**
   * Функция задания новой информации пользователя
   * @param {Object} объект, содержащий новую информацию пользователя, name - имя, about - описание, avatar - аватар
   */
  setUserInfo({ name, about, avatar }) {
    this._username.textContent = name;
    this._description.textContent = about;
    this._avatar.src = avatar;
  }
}
