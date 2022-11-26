export default class Api {
  constructor({ serverLink, headers }) {
    this._serverLink = serverLink;
    this._headers = headers;
  }

  _gotResponse(response, functionName) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error in ${functionName}: ${response.status}`);
  }

  getCards() {
    return fetch(`${this._serverLink}/cards`, {
      headers: this._headers,
    }).then((response) => this._gotResponse(response, "getCards"));
  }

  getUserInfo() {
    return fetch(`${this._serverLink}/users/me`, {
      headers: this._headers,
    }).then((response) => this._gotResponse(response, "getUserInfo"));
  }

  editUserInfo({ username, description }) {
    return fetch(`${this._serverLink}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: username,
        about: description,
      }),
    }).then((response) => this._gotResponse(response, "editUserInfo"));
  }

  editAvatar({ avatar }) {
    return fetch(`${this._serverLink}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((response) => this._gotResponse(response, "editAvatar"));
  }

  addCard({ name, link }) {
    return fetch(`${this._serverLink}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((response) => this._gotResponse(response, "addCard"));
  }

  deleteCard(cardId) {
    return fetch(`${this._serverLink}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((response) => this._gotResponse(response, "deleteCard"));
  }

  addLike(cardId) {
    return fetch(`${this._serverLink}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((response) => this._gotResponse(response, "addLike"));
  }

  removeLike(cardId) {
    return fetch(`${this._serverLink}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((response) => this._gotResponse(response, "removeLike"));
  }
}
