"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { api } from "src/lib/api";
import { Post } from "@/types/feed"; // Importando o tipo Post
import { FormData, schema } from "@/types/posts"; // Importando o schema e tipo FormData

let posts: Post[] = [];

export default function Feed() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { carregar: true },
    });

    async function carregarPosts() {
        try {
            const response = await api.get("/posts");
            posts = response.data.reverse();

            if (posts.length === 0) {
                alert("Ainda não há posts!");
                return;
            }

            router.refresh(); // força rerender do componente após mudança externa
        } catch (error) {
            console.error("Erro ao carregar posts", error);
        }
    }

    return (
        <div className="p-6 font-primary bg-white min-h-full max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Últimas fotos</h1>
            <hr className="border-t-2 border-orange-text mb-6 w-full" /> {/* divider */}

            <form onSubmit={handleSubmit(carregarPosts)}>
                <input type="hidden" {...register("carregar")} value="true" />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded mb-6 block mx-auto"
                >
                    {isSubmitting ? "Carregando..." : "Carregar posts"}
                </button>
            </form>

            {posts.length === 0 ? (
                <p className="text-center text-gray-500 mt-20"> {/*verifca se há imagem*/}
                    Ainda não há posts! {/*agora tem mensagem :D*/}
                </p>
            ) : (
                <div className="flex flex-col gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="border rounded shadow-sm bg-white">

                            {/*cabeçalho do post */}
                            <div className="flex items-center justify-between p-4 border-b">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={post.user.image || "https://via.placeholder.com/40"}
                                        alt="Foto de perfil"
                                        className="w-10 h-10 rounded-full object-cover border"
                                    />
                                    <span className="text-sm font-medium">@{post.user.nome}</span>
                                </div>
                            </div>

                            {/*imagem/foto*/}
                            <div className="bg-gray-50 h-96 flex items-center justify-center">
                                <img
                                    src={post.imagem}
                                    alt="Foto postada"
                                    className="max-h-96 object-contain w-full"
                                />
                            </div>

                            {/*desc*/}
                            <div className="p-4 text-sm border-t">
                                <strong>{post.user.nome}</strong> {post.descricao}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
