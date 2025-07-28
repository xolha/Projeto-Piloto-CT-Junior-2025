"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { api } from "src/lib/api";

{/*post*/}
type Post = {
    id: string;
    imagem: string;
    descricao: string;
};

{/*perfil*/}
type Perfil = {
    nome: string;
    imagem?: string;
    descricao?: string;
};

const schema = z.object({
    carregar: z.literal(true),
});

type FormData = z.infer<typeof schema>;

let perfil: Perfil = {
    nome: "Usuário",
    imagem: "",
    descricao: "",
};

let posts: Post[] = [];

export default function MeuPerfil() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { carregar: true },
    });

    async function carregarPerfil() {
        try {
            const response = await api.get("/profile");

            perfil = response.data;
            posts = response.data.posts || []; // ← se vierem juntos

            router.refresh(); // força rerender para refletir os dados
        } catch (error) {
            console.error("Erro ao carregar perfil ou posts", error);
        }
    }

    {/*imagem padrao*/}
    const imagemPadrao = perfil.imagem || "https://www.w3schools.com/howto/img_avatar.png";

    return (
        <div className="min-h-screen bg-white p-6 font-primary">
            <h1 className="text-3xl font-bold text-orange-text mb-6">Meu Perfil</h1>

            <form onSubmit={handleSubmit(carregarPerfil)}>
                <input type="hidden" {...register("carregar")} value="true" />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded mb-6"
                >
                    {isSubmitting ? "Carregando..." : "Carregar Perfil"}
                </button>
            </form>

            {/*foto de perfil e descrição*/}
            <div className="flex gap-6 items-start mb-10">

                {/*foto de perfil*/}
                <div className="text-center">
                    <div
                        className="w-28 h-28 rounded-full border border-gray-400 flex items-center justify-center overflow-hidden mx-auto">
                        <img
                            src={imagemPadrao}
                            alt="foto de perfil"
                            className="w-28 h-28 rounded-full object-cover"
                        />
                    </div>
                    <p className="text-sm mt-2 font-medium">{perfil.nome}</p>
                </div>

                {/*desc*/}
                <div className="flex-1">
                    <div className="w-full h-24 p-2 border border-gray-400 rounded resize-none">
                        {perfil.descricao || (
                            <textarea
                                className="text-gray-400 italic"
                                placeholder="Descrição (máx: 180 caracteres)"
                            />
                        )}

                        <p className="text-sm text-gray-500 mt-1"></p>
                    </div>

                    {posts.length === 0 && (
                        <p className="text-gray-500 mt-4">Você ainda não postou nada.</p>
                    )}
                </div>
            </div>

            {/*posts*/}
            {posts.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                    {posts.map((post) => (
                        <div key={post.id} className="w-full h-36 bg-gray-100 rounded flex items-center justify-center">
                            <img
                                src={post.imagem}
                                alt="Post"
                                className="h-full w-full object-cover rounded"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
