"use client"
import { useEffect, useState } from "react";
import { api } from "../lib/api";

export function Feed() {
    const [posts, setPosts] = useState<Post[]>([]);

    {/*infos do back*/}
    type Post = {
        id: string;
        imagem: string;
        descricao: string;

        user: {
            image: string;
            nome: string;
            avatar: string;
        };
    };

    {/*ordem dos posts */}
    useEffect(() => {
        async function carregarPosts() {
            try {
                const response = await api.get("/posts");
                const postsOrdenados = response.data.reverse();
                setPosts(postsOrdenados);
            } catch (err) {
                console.error("Erro ao carregar posts", err);
            }
        }

        carregarPosts();
    }, []);

    return (
        <div className="p-6 font-primary bg-white min-h-full max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-center mb-6">Últimas fotos</h1>
            <hr className="border-t-2 border-orange-text mb-6 w-full" /> {/* divider */}

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
        </div>
    );
}
