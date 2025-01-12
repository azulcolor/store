const express = require('express');
const userController = require('../controllers/user.controller.js');
const validationMiddleware = require('../middlewares/validation.middleware.js');
const { createUserSchema, updateUserSchema } = require('../validators/user.validator.js');

const router = express.Router();

router.get('/', userController.getAll.bind(userController));
router.get('/:id', userController.getById.bind(userController));
router.post(
  '/',
  validationMiddleware.validateSchema(createUserSchema),
  userController.create.bind(userController)
);
router.patch(
  '/:id',
  validationMiddleware.validateSchema(updateUserSchema),
  userController.update.bind(userController)
);
router.delete('/:id', userController.delete.bind(userController));
router.patch('/activate/:id', userController.activateUser.bind(userController))

module.exports = router;

