const allowedCors = [
	'https://praktikum.tk',
	'http://praktikum.tk',
	'http://localhost:3000',
  'https://sysoev.nomoreparties.co'
];
const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

const cors = (req, res, next) => {
	const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
	// проверяем, что источник запроса есть среди разрешённых
	const { method } = req;
	const requestHeaders = req.headers['access-control-request-headers'];
	if (allowedCors.includes(origin)) {
		res.header('Access-Control-Allow-Origin', origin);
	}
	if (method === 'OPTIONS') {
		// разрешаем кросс-доменные запросы с этими заголовками
		res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
		res.header('Access-Control-Allow-Headers', requestHeaders);
		// завершаем обработку запроса и возвращаем результат клиенту
		return res.end();
	}
	next();
};

module.exports = { cors };
