const express = require('express');
const orderController = require('../controllers/order.controller.js');
const validationMiddleware = require('../middlewares/validation.middleware.js');
const authMiddleware = require('../middlewares/auth.middleware.js');
const { createOrderSchema, updateOrderSchema } = require('../validators/order.validator.js');

const router = express.Router();

router.use(authMiddleware.verifyToken.bind(authMiddleware)); 

router.get('/', orderController.getAll.bind(orderController));
router.get('/:id', orderController.getById.bind(orderController));
router.post(
  '/',
  validationMiddleware.validateSchema(createOrderSchema),
  orderController.create.bind(orderController)
);
router.patch('/cancel/:id', orderController.cancel.bind(orderController))
router.patch(
  '/:id',
  validationMiddleware.validateSchema(updateOrderSchema),
  orderController.update.bind(orderController)
);
router.delete('/:id', orderController.delete.bind(orderController));

module.exports = router;
