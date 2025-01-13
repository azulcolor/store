const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'El nombre debe ser un texto',
    'string.empty': 'El nombre es requerido',
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'string.max': 'El nombre no debe exceder 50 caracteres',
    'any.required': 'El nombre es requerido',
  }),
  price: Joi.number().min(0.01).required().messages({
    'number.base': 'El precio debe ser un número',
    'number.min': 'El precio debe ser mayor a 0',
    'any.required': 'El precio es requerido',
  }),
  stock: Joi.number().integer().min(0).messages({
    'number.base': 'El stock debe ser un número',
    'number.min': 'El stock no puede ser negativo',
  }),
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(50).messages({
    'string.base': 'El nombre debe ser un texto',
    'string.empty': 'El nombre no puede estar vacío',
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'string.max': 'El nombre no debe exceder 50 caracteres',
  }),
  price: Joi.number().min(0.01).messages({
    'number.base': 'El precio debe ser un número',
    'number.min': 'El precio debe ser mayor a 0',
  }),
  stock: Joi.number().integer().min(0).messages({
    'number.base': 'El stock debe ser un número',
    'number.min': 'El stock no puede ser negativo',
  }),
}).min(1); 

module.exports = { createProductSchema, updateProductSchema };
