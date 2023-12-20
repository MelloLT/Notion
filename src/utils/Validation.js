import { z } from 'zod';

export const User = z.object({
  email: z.string().email({ message: 'Enter correct email' }),
  password: z
    .string()
    .min(8, { message: 'Password must contain at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain 1 capital letter' })
    .regex(/[a-z]/, { message: 'Password must contain 1 lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain 1 digit' }),
  date: z.number().nonnegative(),
});

export const Note = z.object({
  title: z.string().min(1, { message: 'Note must have a title' }),
  text: z.string().optional(),
});
