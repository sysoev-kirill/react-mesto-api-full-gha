class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;

	}
	// setToken(token) {
	// 	this._headers.authorization = `Bearer ${token}`;
	// }

	_onRes(response) {
		return response.ok ? response.json() : Promise.reject({ ...response, message: "Ошибка на стороне сервиса" });
	}

	getInitialCards() {

		return fetch(`${this._baseUrl}/cards`, {
			headers: this._headers,
			Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
		}).then(this._onRes)
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this._headers,
		}).then(this._onRes)
	}

	updateUserProfileInfo(dataProfile) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: dataProfile.name,
				about: dataProfile.about
			})
		}).then(this._onRes)
	}

	addNewCard(dataCard) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name: dataCard.name,
				link: dataCard.link
			})
		}).then(this._onRes)
	}

	deleteCardById(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: "DELETE",
			headers: this._headers,
		}).then(this._onRes)
	}

	changeLikeCardStatus(cardId, isLiked) {
		if (isLiked) {
			return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
				headers: this._headers,
				method: 'DELETE'
			})
				.then(this._onRes)
		} else {
			return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
				headers: this._headers,
				method: 'PUT'
			})
				.then(this._onRes)
		}
	}

	editAvatarUser(data) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
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
	baseUrl: 'https://api.sysoev.nomoreparties.co',
	headers: {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
		'Content-Type': 'application/json'
	}
});
