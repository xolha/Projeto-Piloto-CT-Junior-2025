"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { api } from "src/lib/api";

{/*schema*/}
const schema = z.object({
    linkImagem: z.string().url("Insira um link válido para a imagem."),
    descricao: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function Postar() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    {/*postar as imagens*/}
    async function enviarPost(data: FormData) {
        try {
            await api.post("/posts", {
                imagem: data.linkImagem,
                descricao: data.descricao,
            });

            alert("Post enviado com sucesso!");
            reset();
            router.refresh();
        } catch (err) {
            alert("Erro ao postar foto");
            console.error(err);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-6 font-primary">
            <div className="w-full max-w-md text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Postar nova foto</h1>
                <hr className="border-t-2 border-orange-text mb-6 w-full" /> {/* divider */}

                <form onSubmit={handleSubmit(enviarPost)} className="flex flex-col gap-4 border p-6 rounded shadow">
                    <input
                        type="text"
                        placeholder="Link para foto"
                        className="border border-gray-400 p-2 rounded"
                        {...register("linkImagem")}
                    />

                    <input
                        type="text"
                        placeholder="Descrição (Opcional)"
                        className="border border-gray-400 p-2 rounded"
                        {...register("descricao")}
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="p-2 rounded text-white bg-green-800 hover:bg-green-900 transition-colors">
                        {isSubmitting ? "Enviando..." : "Enviar"}
                    </button>
                </form>
            </div>
        </div>
    );
}
