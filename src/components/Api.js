export default class Api {
  constructor({serverLink, headers}) {
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

  editUserInfo({username, description}) {
    return fetch(`${this._serverLink}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: username,
        about: description,
      }),
    }).then((response) => this._gotResponse(response, "editUserInfo"));
  }
}
