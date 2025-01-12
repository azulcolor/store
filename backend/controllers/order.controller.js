const orderService = require('../services/order.service.js');
const handleError = require('../utils/handle-error.js');

class OrderController {
  async getAll(req, res) {
    try {
      const filters = req.query; 
      const orders = await orderService.getAllOrders(req.user.id, filters);
      res.status(200).json({ ok: true, orders });
    } catch (error) {
      handleError.showErrorMessage(res, error);
    }
  }

  async getById(req, res) {
    try {
      const order = await orderService.getOrderById(req.params.id, req.user.id);
      res.status(200).json({ ok: true, order });
    } catch (error) {
      handleError.showErrorMessage(res, {
        message: 'Order not found',
        status: 404,
      });
    }
  }

  async create(req, res) {
    try {
      const order = await orderService.createOrder(req.user.id, req.body);
      res.status(201).json({ ok: true, order });
    } catch (error) {
      handleError.showErrorMessage(res, error);
    }
  }

  async update(req, res) {
    try {
      const order = await orderService.updateOrder(
        req.params.id,
        req.user.id,
        req.body
      );
      res.status(200).json({ ok: true, order });
    } catch (error) {
      handleError.showErrorMessage(res, {
        message: 'Order not found',
        status: 404,
      });
    }
  }

  async delete(req, res) {
    try {
      await orderService.deleteOrder(req.params.id, req.user.id);
      res.status(204).send();
    } catch (error) {
      handleError.showErrorMessage(res, {
        message: 'Order not found',
        status: 404,
      });
    }
  }
}

module.exports = new OrderController();
