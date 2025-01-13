const db = require('../models/index.js');

class ProductService {
  constructor() {
    this.Product = db.Product;
  }

  async getAllProducts() {
    return await this.Product.findAll();
  }

  async getProductsByBusiness(businessId) {
    return await this.Product.findAll({
      where: { businessId },
      attributes: ['id', 'name', 'price', 'stock'],
    });
  }

  async getProductById(id, businessId) {
    const product = await this.Product.findOne({ where: { id, businessId } });
    if (!product) {
      throw new Error('Product not found or access denied');
    }
    return product;
  }

  async createProduct(data) {
    return await this.Product.create(data);
  }

  async updateProduct(id, data, businessId) {
    const product = await this.getProductById(id, businessId); 
    return await product.update(data);
  }

  async deleteProduct(id, businessId) {
    const product = await this.getProductById(id, businessId); 
    return await product.destroy();
  }
}

module.exports = new ProductService();


