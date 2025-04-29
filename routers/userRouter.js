const express = require('express');
const validMiddleware = require('../middlewares/validMiddlewares');
const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post(
    "/login",
    validMiddleware.validationRules.login,
    validMiddleware.userValidationResult,
    userController.login
);

userRouter.post(
    "/register",
    validMiddleware.validationRules.register,
    validMiddleware.userValidationResult,
    userController.register
);

userRouter.get(
    "/logout",
    userController.logout
);

module.exports = userRouter;