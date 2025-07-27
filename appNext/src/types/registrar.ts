import { z } from 'zod';

// Simulação de usernames já existentes no banco de dados
const existingUsernames = ['admin', 'usuario', 'teste'];

export const registerSchema = z
  .object({
    username: z.string()
      .nonempty()
      .refine((name) => !existingUsernames.includes(name.toLowerCase()), {
        message: 'Este nome de usuário já está em uso.',
      }),

    email: z.email({ message: 'Por favor, insira um e-mail válido.' }),

    password: z.string()
      .nonempty()
      .min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),

    confirmPassword: z.string()
      .nonempty()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  });

// Tipo dos dados do formulário
export type RegisterFormData = z.infer<typeof registerSchema>;

// Esquema para remover 'confirmPassword'
const finalRegisterSchema = registerSchema.transform((data) => {
  const { confirmPassword, ...rest } = data;
  return rest;
});
