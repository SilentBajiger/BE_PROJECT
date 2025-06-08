const express = require('express');
const { loginController, signupController } = require('../controllers/userController');
const route = express.Router();


route.post('/login',loginController);
route.post('/signup',signupController);

const UserRouter = route;
module.exports = UserRouter;