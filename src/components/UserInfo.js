export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._username = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  // функция получения информации со страницы
  getUserInfo() {
    return {
      username: this._username.textContent,
      description: this._description.textContent,
    };
  }

  // функция добавления информации на страницу
  setUserInfo({ username, description }) {
    this._username.textContent = username;
    this._description.textContent = description;
  }
}
