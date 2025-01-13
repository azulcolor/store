const cartService = require('../services/cart.service.js');
const handleError = require('../utils/handle-error.js');

class CartController {
  async getCarts(req, res) {
    try {
      const cart = await cartService.getCarts(req.user.id);
      res.status(200).json({ ok: true, cart });
    } catch (error) {
      res.json(error)
    }
  }

  async addProduct(req, res) {
    try {
      const { productId, quantity } = req.body;
      const cart = await cartService.addProductToCart(req.user.id, productId, quantity);
      res.status(200).json({ ok: true, cart });
    } catch (error) {
      handleError.showErrorMessage(res, error);
    }
  }

  async updateProduct(req, res) {
    try {
      const { productId, quantity } = req.body;
      const cart = await cartService.updateProductQuantity(req.user.id, productId, quantity);
      res.status(200).json({ ok: true, cart });
    } catch (error) {
        console.log(error)
      handleError.showErrorMessage(res, error);
    }
  }

  async removeProduct(req, res) {
    try {
      const { productId } = req.params;
      const cart = await cartService.removeProductFromCart(req.user.id, productId);
      res.status(200).json({ ok: true, cart });
    } catch (error) {
      handleError.showErrorMessage(res, error);
    }
  }

  async checkout(req, res) {
    try {
      const { orderId } = req.body;
      const response = await cartService.checkout(orderId, req.user.id);
      res.status(200).json(response);
    } catch (error) {
      handleError.showErrorMessage(res, error);
    }
  }
}

module.exports = new CartController();
