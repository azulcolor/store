const db = require('../models/index.js');

class ProductService {
  constructor() {
    this.Product = db.Product;
  }

  async getAllProducts(businessId) {
    // Retornar productos que pertenecen al negocio autenticado
    return await this.Product.findAll({ where: { businessId } });
  }

  async getProductsByBusiness(businessId) {
    return await this.Product.findAll({
      where: { businessId },
      attributes: ['id', 'name', 'price', 'stock'],
    });
  }

  async getProductById(id, businessId) {
    // Validar que el producto pertenece al negocio autenticado
    const product = await this.Product.findOne({ where: { id, businessId } });
    if (!product) {
      throw new Error('Product not found or access denied');
    }
    return product;
  }

  async createProduct(data) {
    // Crear producto asociado al negocio autenticado
    return await this.Product.create(data);
  }

  async updateProduct(id, data, businessId) {
    const product = await this.getProductById(id, businessId); // Validar propiedad
    return await product.update(data);
  }

  async deleteProduct(id, businessId) {
    const product = await this.getProductById(id, businessId); // Validar propiedad
    return await product.destroy();
  }
}

module.exports = new ProductService();


