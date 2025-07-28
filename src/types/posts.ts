import { z } from 'zod';

export const schema = z.object({
    carregar: z.literal(true), // campo fake apenas para acionar o botão
});

export type FormData = z.infer<typeof schema>;

/* poderia ser usado para validação de postagens
export const postSchema = z.object({
  imagem: z.url({ message: "Por favor, insira um link de imagem válido." }),
  descricao: z.string().optional(),
});

export type PostFormData = z.infer<typeof postSchema>;*/