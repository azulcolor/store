const express = require('express');
const authController = require('../controllers/auth.controller.js');
const validationMiddleware = require('../middlewares/validation.middleware.js');
const loginValidator = require('../validators/login.validator.js');

const router = express.Router();

router.post(
  '/login',
  validationMiddleware.validateSchema(loginValidator), 
  authController.login.bind(authController)
);

module.exports = router;
