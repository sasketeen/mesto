export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._username = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      username: this._username.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo({ username, description }) {
    this._username.textContent = username;
    this._description.textContent = description;
  }
}
