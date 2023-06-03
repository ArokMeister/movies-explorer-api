const { NotFoundError } = require('../../utils/customError/NotFoundError');

function handleNotFoundRoutes(req, res, next) {
  next(new NotFoundError('Страница не найдена'));
}

module.exports = handleNotFoundRoutes;
