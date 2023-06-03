const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../../utils/customError/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя не указанo'],
    minlength: [2, 'Минимальная длина поля имени пользователя 2 символа'],
    maxlength: [30, 'Максимальная длинна поля имени пользователя 30 символов'],
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: 'Неверный формат почты',
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { toJSON: { useProjection: true }, toObject: { useProjection: true } });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильная почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильная почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
