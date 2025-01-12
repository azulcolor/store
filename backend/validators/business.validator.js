const Joi = require('joi');

const businessSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'El nombre debe ser un texto',
    'string.empty': 'El nombre es requerido',
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'string.max': 'El nombre no debe exceder 30 caracteres',
    'any.required': 'El nombre es requerido',
  }),
});

module.exports = businessSchema;


