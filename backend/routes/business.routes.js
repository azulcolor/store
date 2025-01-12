const express = require('express');

const businessController = require('../controllers/business.controller.js');
const validationMiddleware = require('../middlewares/validation.middleware.js');
const businessValidator = require('../validators/business.validator.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.use(authMiddleware.verifyToken.bind(authMiddleware))

router.get('/', businessController.getAll.bind(businessController));
router.get('/search', businessController.getByName.bind(businessController));
router.get('/:id', businessController.getById.bind(businessController));
router.post(
  '/',
  validationMiddleware.validateSchema(businessValidator),
  businessController.create.bind(businessController)
);
router.put(
  '/:id',
  validationMiddleware.validateSchema(businessValidator),
  businessController.update.bind(businessController)
);
router.delete('/:id', businessController.delete.bind(businessController));

module.exports = router;
