class Auth {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	_onRes(response) {
		return response.ok ? response.json() : Promise.reject({ ...response, message: "Ошибка на стороне сервиса" });
	}

	register(email, password) {
		return fetch(`${this._baseUrl}/signup`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({ email, password })
		}).then(this._onRes)
	}

	authorize(email, password) {
		return fetch(`${this._baseUrl}/signin`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				email,
				password
			})
		}).then(this._onRes)
	}

	checkToken(token) {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		}).then(this._onRes)
	}


}

export const auth = new Auth({
	// baseUrl: 'https://auth.nomoreparties.co',
	// baseUrl: 'http://localhost:3000',
	baseUrl: 'https://api.sysoev.nomoreparties.co',
	headers: {
    'Accept': 'application/json',
		'Content-Type': 'application/json',
	}
});