import * as yup from 'yup';

export const schema = yup.object({
    email: yup.string().email('Correo inválido').required('Correo es requerido'),
    password: yup.string().min(8, 'Mínimo 8 letras').required('Contraseña requerida'),
  });