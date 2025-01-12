const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'El email debe ser válido',
      'string.empty': 'El email es requerido',
      'any.required': 'El email es requerido',
    }),
  password: Joi.string()
    .min(8)
    .required()
    .messages({
      'string.empty': 'La contraseña es requerida',
      'string.min': 'La contraseña debe tener al menos 8 caracteres',
      'any.required': 'La contraseña es requerida',
    }),
});

module.exports = loginSchema;
