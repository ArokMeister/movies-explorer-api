const userRouter = require('express').Router();
const { getUser, updateUserInfo } = require('../../components/users/controller');
const { userInfoValidation } = require('../../utils/validators/joiValidateUsers');

userRouter.get('/me', getUser);
userRouter.patch('/me', userInfoValidation, updateUserInfo);

module.exports = userRouter;
