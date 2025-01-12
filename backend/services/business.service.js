const db = require('../models/index.js');

class BusinessService {
  constructor() {
    this.Business = db.Business;
  }

  async getAllBusinesses() {
    return await this.Business.findAll();
  }

  async getBusinessById(id) {
    const business = await this.Business.findByPk(id);
    if (!business) {
      throw new Error('Business not found');
    }
    return business;
  }

  async getBusinessByName(name) {
    const businesses = await this.Business.findAll({
      where: {
        name: {
          [db.Sequelize.Op.iLike]: `%${name}%`, // Búsqueda con comodines (case-insensitive)
        },
      },
    });
    if (!businesses.length) {
      throw new Error('No businesses found with the given name');
    }
    return businesses;
  }

  async createBusiness(data) {
    return await this.Business.create(data);
  }

  async updateBusiness(id, data) {
    const business = await this.getBusinessById(id);
    return await business.update(data);
  }

  async deleteBusiness(id) {
    const business = await this.getBusinessById(id);
    return await business.destroy();
  }
}

module.exports = new BusinessService();

