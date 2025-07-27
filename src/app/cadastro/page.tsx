"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

// Simulação de usernames já existentes no banco de dados
const existingUsernames = ['admin', 'usuario', 'teste'];

const registerSchema = z
  .object({
    username: z.string()
      .nonempty()
      .refine((name) => !existingUsernames.includes(name.toLowerCase()), {
        message: 'Este nome de usuário já está em uso.',
      }),

    email: z.email({ message: 'Por favor 😭, insira um e-mail válido.' }),

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
type RegisterFormData = z.infer<typeof registerSchema>;

// Esquema para remover 'confirmPassword'
const finalRegisterSchema = registerSchema.transform((data) => {
  const { confirmPassword, ...rest } = data;
  return rest;
});

export default function CadastroPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(data: RegisterFormData) {
    const finalData = finalRegisterSchema.parse(data);
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Dados FINAIS a serem enviados para o back-end:', finalData);
    alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
    router.push('/login');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-700">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-green-900 p-8 rounded shadow-md w-[350px] flex flex-col items-center"
      >
        <img src="/assets/logo_branca.png" alt="Logo CT" className="mb-8" />
        <h1 className="text-center text-3xl text-white">Realizar Cadastro</h1>
        <div className="mb-6 w-full">
          <input
            id="email"
            type="text"
            placeholder="Email"
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-200 text-black"
            {...register('email')}
          />
        </div>
        {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}

        <div className="mb-6 w-full">
          <input
            id="Username"
            type="text"
            placeholder="Usuário(obs max = 15 caracters)"
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-200 text-black"
            {...register('username')}
          />
        </div>
        {errors.username && <span className="text-sm text-red-500">{errors.username.message}</span>}

        <div className="mb-6 w-full">
          <input
            id="senha"
            type="password"
            placeholder="Senha(obs min = 6 letras)"
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-200 text-black"
            {...register('password')}
          />
        </div>
        {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}

        <div className="mb-6 w-full">
          <input
            id="senha"
            type="password"
            placeholder="Confirmar senha"
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-200 text-black"
            {...register('confirmPassword')}
          />
        </div>
        {errors.confirmPassword && <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>}

        <button type="submit" disabled={isSubmitting} className="text-black w-full bg-orange-600 hover:bg-orange-700 py-2 rounded font-bold transition-colors">
          {isSubmitting ? 'Criando...' : 'Criar Conta'}
        </button>

      </form>
    </div>
  );
}
