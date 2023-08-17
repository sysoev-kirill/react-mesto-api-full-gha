class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;

	}

	_onRes(response) {
		return response.ok ? response.json() : Promise.reject({ ...response, message: "Ошибка на стороне сервиса" });
	}

	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
		}).then(this._onRes)
	}


	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
		}).then(this._onRes)
	}

	updateUserProfileInfo(dataProfile) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      },
			body: JSON.stringify({
				name: dataProfile.name,
				about: dataProfile.about
			})
		}).then(this._onRes)
	}

	addNewCard(dataCard) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      },
			body: JSON.stringify({
				name: dataCard.name,
				link: dataCard.link
			})
		}).then(this._onRes)
	}

	deleteCardById(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      },
		}).then(this._onRes)
	}

	changeLikeCardStatus(cardId, isLiked) {
		if (isLiked) {
			return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
				method: 'DELETE'
			})
				.then(this._onRes)
		} else {
			return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json'
        },
				method: 'PUT'
			})
				.then(this._onRes)
		}
	}

	editAvatarUser(data) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json'
      },
			body: JSON.stringify({
			avatar: data.avatar
			})
		})
			.then(this._onRes);
	}
}

export const api = new Api({
	// baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
	// baseUrl: 'http://localhost:3001',
	baseUrl: 'https://api.sysoev.nomoreparties.co'
});