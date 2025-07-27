"use client"
import {useState} from "react";

export function MeuPerfil() {
    const [imagemURL, setImagemURL] = useState("");
    const [descricao, setDescricao] = useState("");
    const [posts] = useState(["", "", "", "", "", "", "", "", ""]);

    function trocarImagem() {
        const link = prompt("Cole o link da imagem:");
        if (link) {
            setImagemURL(link);
        }
    }

    return (
        <div className="min-h-screen bg-white p-6 font-primary">
            <h1 className="text-3xl font-bold text-orange-text mb-6">Meu Perfil</h1>

            {/*foto de perfil e descrição*/}
            <div className="flex gap-6 items-start mb-10">

                {/*foto de perfil*/}
                <div className="text-center">
                    <div onClick={trocarImagem}
                         className="w-28 h-28 rounded-full border border-gray-400 flex items-center justify-center overflow-hidden cursor-pointer mx-auto">

                    {imagemURL ? (
                        <img
                            src={imagemURL}
                            alt="Foto de perfil"
                            className="w-28 h-28 rounded-full object-cover border border-gray-400"
                        />
                    ) : (
                        <p className="text-sm">Foto de perfil</p>
                    )}

                    </div>
                </div>


                {/*descrição*/}
                <div className="flex-1">
          <textarea
              className="w-full h-24 p-2 border border-gray-400 rounded resize-none"
              placeholder="Descrição (máx: 180 caracteres)"
              value={descricao}
              onChange={(e) => {
                  if (e.target.value.length <= 180) {
                      setDescricao(e.target.value);
                  }
              }}
          />
                    <p className="text-sm text-gray-500 mt-1"></p>
                </div>
            </div>

            {/*posts*/}
            <div>
                <div className="grid grid-cols-3 gap-4">
                    {posts.map(() => (
                        <div
                            className="w-full h-36 bg-gray-300 rounded flex items-center justify-center">
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

