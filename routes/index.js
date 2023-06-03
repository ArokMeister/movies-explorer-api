const router = require('express').Router();
const userRouter = require('./users/routes');
const movieRouter = require('./movies/routes');
const notFoundRouter = require('./notFound/routes');
const { auth } = require('../middlewares/auth');
const { createUser, login, clearCookie } = require('../components/users/controller');
const { userRegisterValidation, userLoginValidation } = require('../utils/validators/joiValidateUsers');

router.post('/signin', userLoginValidation, login);
router.post('/signup', userRegisterValidation, createUser);

router.use(auth);

router.post('/signout', clearCookie);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', notFoundRouter);

module.exports = router;
