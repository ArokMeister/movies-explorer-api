const bcrypt = require('bcryptjs');
const User = require('./model');
const { CREATED_201 } = require('../../constants/constants');
const { generateToken } = require('../../utils/token');
const NotFoundError = require('../../utils/customError/NotFoundError');

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const payload = { _id: user._id };
    const token = generateToken(payload);
    res
      .cookie('jwt', token, { maxAge: (3600000 * 24 * 7), httpOnly: true, sameSite: true })
      .send({ message: 'Авторизация прошла успешно' });
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new NotFoundError('Пользователь с данным id не найден');
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  const { name, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    res.status(CREATED_201).send({ user }); // user in obj
  } catch (err) {
    next(err);
  }
}

async function updateUserInfo(req, res, next) {
  const { _id } = req.user;
  const { name, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      _id,
      { name, email },
      { new: true, runValidators: true },
    );
    res.send(user);
  } catch (err) {
    next(err);
  }
}

function clearCookie(_, res, next) {
  try {
    res.clearCookie('jwt').send({ message: 'Выполнен выход из аккаунта' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  login,
  createUser,
  getUser,
  updateUserInfo,
  clearCookie,
};
