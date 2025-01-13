const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  roleId: Joi.number().integer().required(),
  businessId: Joi.number().integer().optional(), 
}).when(Joi.object({ roleId: 1 }).unknown(), {
  then: Joi.object({
    businessId: Joi.number().integer().required().messages({
      'any.required': 'Business ID is required for business users',
    }),
  }),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  password: Joi.string().min(8),
  roleId: Joi.number().integer(),
  businessId: Joi.number().integer(),
}).min(1); 

module.exports = { createUserSchema, updateUserSchema };





