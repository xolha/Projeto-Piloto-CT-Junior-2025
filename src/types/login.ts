import z from "zod";

export const loginSchema = z.object({
  email: z.email()
  .nonempty({ message: 'O email é obrigatório.' }),
  
  password: z.string()
  .nonempty({ message: 'A senha é obrigatória.' })
  .min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
})

export type LoginFormData = z.infer<typeof loginSchema>;