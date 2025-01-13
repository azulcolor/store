const express = require('express');
const productController = require('../controllers/product.controller.js');
const validationMiddleware = require('../middlewares/validation.middleware.js');
const authMiddleware = require('../middlewares/auth.middleware.js');
const roleMiddleware = require('../middlewares/role.middleware.js');
const {
  updateProductSchema,
} = require('../validators/product.validator.js');

const router = express.Router();

router.use(authMiddleware.verifyToken.bind(authMiddleware)); 

router.post('/', productController.create.bind(productController));

router.patch(
  '/:id',
  roleMiddleware.isBusiness.bind(roleMiddleware),
  validationMiddleware.validateSchema(updateProductSchema),
  productController.update.bind(productController)
);

router.delete(
  '/:id',
  roleMiddleware.isBusiness.bind(roleMiddleware),
  productController.delete.bind(productController)
);

router.get('/', productController.getAll.bind(productController));
router.get(
  '/my-products',
  roleMiddleware.isBusiness.bind(roleMiddleware),
  productController.getByBusiness.bind(productController)
);
router.get('/:id', productController.getById.bind(productController));


module.exports = router;
