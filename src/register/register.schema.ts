import z from 'zod';

export const nameSchema = z
  .string({ message: 'El nombre debe ser un texto' })
  .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
  .regex(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/, {
    message: 'El nombre solo puede contener letras y espacios.',
  });

export const lastNameSchema = z
  .string({ message: 'El apellido debe ser un texto' })
  .min(2, { message: 'El apellido debe tener al menos 2 caracteres.' })
  .regex(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/, {
    message: 'El apellido solo puede contener letras y espacios.',
  });

export const emailSchema = z.string().email({
  message: 'Por favor ingresa un correo electrónico válido.',
});

export const roleSchema = z.enum(['driver', 'passenger']);

export const passwordSchema = z.string().min(6, {
  message: 'La contraseña debe tener al menos 6 caracteres.',
});
