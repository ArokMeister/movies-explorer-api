const movieRouter = require('express').Router();
const { getMovies, deleteMovie, createMovie } = require('../../components/movies/controller');
const { movieDataValidation, movieIdValidation } = require('../../utils/validators/joiValidateMovies');

movieRouter.get('/', getMovies);
movieRouter.post('/', movieDataValidation, createMovie);
movieRouter.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = movieRouter;
