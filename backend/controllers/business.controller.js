const businessService = require('../services/business.service.js');
const handleError = require('../utils/handle-error.js');

class BusinessController {
  async getAll(req, res) {
    try {
      const businesses = await businessService.getAllBusinesses();
      res.status(200).json({ok: true, businesses});
    } catch (error) {
      handleError.showErrorMessage(res, error);
    }
  }

  async getById(req, res) {
    try {
      const business = await businessService.getBusinessById(req.params.id);
      res.status(200).json({ok: true, business});
    } catch (error) {
      if (error.message === 'Business not found') {
        return res.status(404).json({ok: false, error: error.message });
      }
      handleError.showErrorMessage(res, error);
    }
  }

  async getByName(req, res) {
    try {
      const businesses = await businessService.getBusinessByName(
        req.query.name
      );
      res.status(200).json({ok: true, businesses});
    } catch (error) {
      if (error.message === 'No businesses found with the given name') {
        return res.status(404).json({ok: false, error: error.message });
      }
      handleError.showErrorMessage(res, error);
    }
  }

  async create(req, res) {
    try {
      const business = await businessService.createBusiness(req.body);
      res.status(201).json({ok: true, business});
    } catch (error) {
      handleError.showErrorMessage(res, error);
    }
  }

  async update(req, res) {
    try {
      const business = await businessService.updateBusiness(
        req.params.id,
        req.body
      );
      res.status(200).json({ok: true, business});
    } catch (error) {
      if (error.message === 'Business not found') {
        return res.status(404).json({ok: false, error: error.message });
      }
      handleError.showErrorMessage(res, error);
    }
  }

  async delete(req, res) {
    try {
      await businessService.deleteBusiness(req.params.id);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'Business not found') {
        return res.status(404).json({ok: false, error: error.message });
      }
      handleError.showErrorMessage(res, error);
    }
  }
}

module.exports = new BusinessController();
