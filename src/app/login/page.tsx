'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { login } from '@/api/login';
import { loginSchema, LoginFormData } from '@/types/login';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors } } = useForm<LoginFormData>({
            defaultValues: {
                email: "",
                password: ""
            },
            resolver: zodResolver(loginSchema)
        })

    handleSubmit(async (data: LoginFormData) => {
        try {
            const response = await login(data);
            Cookies.set("token", response);
            toast.success("Login realizado com sucesso!");
            router.push('/feed');
        } catch (error) {
            console.error("Erro ao realizar login:", error);
            toast.error("Erro ao realizar login. Verifique suas credenciais.");
        }
    });

    async function ZodSuccess(data: LoginFormData) {
        const response = await login(data)
        console.log('Dados FINAIS a serem enviados para o back-end:', data);
        Cookies.set("token", response)
    }

    function zodFail() {
        if (errors.email?.message) {
            toast.error(errors.email.message)
        } else if (errors.password?.message) {
            toast.error(errors.password.message)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-700">
            <form
                onSubmit={handleSubmit(ZodSuccess, zodFail)}
                className="bg-green-900 p-8 rounded shadow-md w-[350px] flex flex-col items-center"
            >
                <img src="assets/logo_branca.png" alt="Logo CT" className="mb-8" />

                <div className="mb-4 w-full">
                    <input
                        id="email"
                        type="text"
                        placeholder="Email"
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-200 text-black"
                        {...register("email")}
                        required
                    />
                </div>

                <div className="mb-6 w-full">
                    <input
                        id="senha"
                        type="password"
                        placeholder="Senha"
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-200 text-black"
                        {...register("password")}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="text-black w-full bg-orange-600 hover:bg-orange-700 py-2 rounded font-bold transition-colors"
                >
                    Entrar
                </button>

                <div className="mt-4 text-center text-white">
                    <Link href="/cadastro" className="hover:underline">
                        Não possui senha?
                    </Link>

                </div>

                <div className="mt-2 text-center text-white">
                    <Link href="/cadastro" className="hover:underline">
                        Clique aqui para se cadastrar!
                    </Link>
                </div>
            </form>
        </div>
    );
}
