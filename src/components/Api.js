export default class Api {
  constructor(serverLink, headers) {
    this._serverLink = serverLink;
    this._headers = headers;
  }

  _gotResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Error: ${response.status}`);
  }

  getCards() {
    return fetch(`${this._serverLink}/cards`, {
      headers: this._headers,
    }).then((response) => this._gotResponse(response));
  }

  getUserInfo() {
    return fetch(`${this._serverLink}/users/me`, {
      headers: this._headers,
    }).then((response) => this._gotResponse(response));
  }
}
