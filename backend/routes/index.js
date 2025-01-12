const express = require('express');

const userRoutes = require('./user.routes.js');
const authRoutes = require('./auth.routes.js');
const businessRoutes = require('./business.routes.js');
const productRoutes = require('./product.routes.js')
const cartRoutes = require('./cart.routes.js')
const orderRoutes = require('./order.routes.js')

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/businesses', businessRoutes);
router.use('/products', productRoutes)
router.use('/cart', cartRoutes)
router.use('/orders', orderRoutes)

module.exports = router;
