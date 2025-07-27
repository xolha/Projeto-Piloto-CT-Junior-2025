'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RegisterFormData, registerSchema } from '@/types/registrar'
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function cadastro() {
const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(data: RegisterFormData) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Dados FINAIS a serem enviados para o back-end:', data);
    toast('Cadastro realizado com sucesso! Você será redirecionado para o login.');
    router.push('/');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-700">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-green-900 p-8 rounded shadow-md w-[350px] flex flex-col items-center"
      >
        <img src="assets/logo_branca.png" alt="Logo CT" className="mb-8" />
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
