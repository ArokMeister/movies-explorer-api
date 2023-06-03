const { celebrate, Joi } = require('celebrate');
const { patternLink } = require('../../constants/constants');

const movieDataValidation = celebrate({
  body: Joi.object({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(patternLink).required(),
    trailerLink: Joi.string().pattern(patternLink).required(),
    thumbnail: Joi.string().pattern(patternLink).required(),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object({
    movieId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  movieDataValidation,
  movieIdValidation,
};
