const Joi = require('joi');

const createOrderSchema = Joi.object({
  businessId: Joi.number().integer().required(),
  statusId: Joi.number().integer().required(),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.number().integer().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
    )
    .required(),
});

const updateOrderSchema = Joi.object({
  statusId: Joi.number().integer().optional(),
});

module.exports = { createOrderSchema, updateOrderSchema };
