const productService = require('../services/product.service.js');
const handleError = require('../utils/handle-error.js');

class ProductController {
  async getAll(req, res) {
    try {
      const products = await productService.getAllProducts(req.user.businessId);
      res.status(200).json({ ok: true, products });
    } catch (error) {
      handleError.showErrorMessage(res, error);
    }
  }

  async getById(req, res) {
    try {
      const product = await productService.getProductById(req.params.id, req.user.businessId);
      res.status(200).json({ ok: true, product });
    } catch (error) {
      handleError.showErrorMessage(res, { message: 'Product not found or access denied', status: 404 });
    }
  }

  async getByBusiness(req, res) {
    try {
      const products = await productService.getProductsByBusiness(req.user.businessId);
      res.status(200).json({ ok: true, products });
    } catch (error) {
      handleError.showErrorMessage(res, error);
    }
  }

  async create(req, res) {
    try {
      const data = {
        ...req.body,
        businessId: req.user.businessId, // Asociar producto al negocio autenticado
      };
      const product = await productService.createProduct(data);
      res.status(201).json({ ok: true, product });
    } catch (error) {
      handleError.showErrorMessage(res, error);
    }
  }

  async update(req, res) {
    try {
      const product = await productService.updateProduct(req.params.id, req.body, req.user.businessId);
      res.status(200).json({ ok: true, product });
    } catch (error) {
      handleError.showErrorMessage(res, { message: 'Product not found or access denied', status: 404 });
    }
  }

  async delete(req, res) {
    try {
      await productService.deleteProduct(req.params.id, req.user.businessId);
      res.status(204).send();
    } catch (error) {
      handleError.showErrorMessage(res, { message: 'Product not found or access denied', status: 404 });
    }
  }
}

module.exports = new ProductController();



