const express = require('express');
const cartController = require('../controllers/cart.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.use(authMiddleware.verifyToken.bind(authMiddleware)); 

router.get('/', cartController.getCarts.bind(cartController));
router.post('/add', cartController.addProduct.bind(cartController));
router.patch('/update', cartController.updateProduct.bind(cartController));
router.delete('/remove/:productId', cartController.removeProduct.bind(cartController));
router.post('/checkout', cartController.checkout.bind(cartController));

module.exports = router;