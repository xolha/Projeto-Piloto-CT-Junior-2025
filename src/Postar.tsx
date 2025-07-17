import { useState } from "react";
import { api } from "./lib/api.ts";

export function Postar() {
    const [linkImagem, setLinkImagem] = useState("");
    const [descricao, setDescricao] = useState("");

    {/*postar as imagens*/}
    async function enviarPost(e: any) {
        e.preventDefault();

        if (!linkImagem) {
            alert("Você precisa postar um link para a foto!");
            return;
        }

        try {
            await api.post("/posts", {
                imagem: linkImagem,
                descricao: descricao,
            });

            setLinkImagem("");
            setDescricao("");

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

                <form onSubmit={enviarPost} className="flex flex-col gap-4 border p-6 rounded shadow">
                    <input
                        type="text"
                        placeholder="Link para foto"
                        className="border border-gray-400 p-2 rounded"
                        value={linkImagem}
                        onChange={(e) => setLinkImagem(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Descrição (Opcional)"
                        className="border border-gray-400 p-2 rounded"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={!linkImagem}
                        className={`p-2 rounded text-white ${
                            linkImagem ? "bg-green-800" : "bg-gray-400 cursor-not-allowed"
                        }`}
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}
