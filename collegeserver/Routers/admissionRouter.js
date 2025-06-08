const express = require('express');
const { loginController, signupController, submitAdmissionFormController } = require('../controllers/userController');
const route = express.Router();


// route.post('/login',loginController);
route.post('/submit-form',submitAdmissionFormController);

const admissionRouter = route;
module.exports = admissionRouter;