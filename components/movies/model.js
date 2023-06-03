const mongoose = require('mongoose');
const { patternLink } = require('../../constants/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Страна создания фильма не указана'],
  },
  director: {
    type: String,
    required: [true, 'Режисёр фильма не указан'],
  },
  duration: {
    type: Number,
    required: [true, 'Длительность фильма не указана'],
  },
  year: {
    type: String,
    required: [true, 'Год выпуска фильма не указан'],
  },
  description: {
    type: String,
    required: [true, 'Описание фильма не указано'],
  },
  image: {
    type: String,
    required: [true, 'Ссылка на постер фильма не указана'],
    validate: {
      validator(values) {
        return patternLink.test(values);
      },
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Ссылка на трейлер фильма не указана'],
    validate: {
      validator(values) {
        return patternLink.test(values);
      },
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Ссылка на миниатюру постера фильма не указана'],
    validate: {
      validator(values) {
        return patternLink.test(values);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Пользователь не указан'],
  },
  movieId: {
    type: Number,
    required: [true, 'ID фильма не указан'],
  },
  nameRU: {
    type: String,
    required: [true, 'Название фильма на русском языке не указано'],
  },
  nameEN: {
    type: String,
    required: [true, 'Название фильма на английском языке не указано'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
