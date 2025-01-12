const Joi = require('joi');

// Esquema para crear usuario
const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  roleId: Joi.number().integer().required(),
  businessId: Joi.number().integer().optional(), // Opcional para roles que no sean negocio
}).when(Joi.object({ roleId: 1 }).unknown(), {
  then: Joi.object({
    businessId: Joi.number().integer().required().messages({
      'any.required': 'Business ID is required for business users',
    }),
  }),
});

// Esquema para actualizar usuario
const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email(),
  password: Joi.string().min(8),
  roleId: Joi.number().integer(),
  businessId: Joi.number().integer(),
}).min(1); // Al menos un campo debe estar presente

module.exports = { createUserSchema, updateUserSchema };





