const express = require('express');
const userController = require('../../controllers/users/userController');

const usersRouter = express.Router();

//! Register User
usersRouter.post('/register', userController.register);

//! login 
usersRouter.post('/login', userController.login);
usersRouter.get('/auth/google', userController.googleAuth);
usersRouter.get('/auth/google/callback', userController.googleAuthCallback);
usersRouter.get('/checkauthenticated', userController.checkAuthenticated);
usersRouter.post("/logout", userController.logout);

module.exports = usersRouter;