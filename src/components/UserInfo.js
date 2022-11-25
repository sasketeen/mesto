export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._username = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  // функция получения информации со страницы
  getUserInfo() {
    return {
      username: this._username.textContent,
      description: this._description.textContent,
    };
  }

  // функция добавления информации на страницу
  setUserInfo({ name, about, avatar }) {
    this._username.textContent = name;
    this._description.textContent = about;
    this._avatar.src = avatar;
  }
}
