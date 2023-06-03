const Movie = require('./model');
const { CREATED_201 } = require('../../constants/constants');
const NotFoundError = require('../../utils/customError/NotFoundError');
const ForbiddenError = require('../../utils/customError/ForbiddenError');

const getMovies = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const movies = await Movie.find({ owner });
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) {
      throw new NotFoundError('Фильм не найден');
    }
    const ownerId = movie.owner._id.toString();
    if (userId !== ownerId) {
      throw new ForbiddenError('Не достаточно прав для этого действия');
    }
    await movie.deleteOne();
    res.send({ message: 'Фильм удален' });
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  const owner = req.user._id;

  try {
    const movie = await Movie.create({ ...req.body, owner });
    res.status(CREATED_201).send(movie);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMovies,
  deleteMovie,
  createMovie,
};
