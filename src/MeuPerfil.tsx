import { useState, type ChangeEvent } from "react";

function MeuPerfil() {
    const [imagem, setImagem] = useState<string | null>(null);
    const [descricao, setDescricao] = useState("");

    /*para selecionar uma nova imagem de perfil*/
    function trocarImagem(evento: ChangeEvent<HTMLInputElement>) {
        const arquivo = evento.target.files?.[0];
        if (arquivo) {
            const urlImagem = URL.createObjectURL(arquivo);
            setImagem(urlImagem);
        }
    }

    /*quando o usuário digita uma descrição*/
    function escreverDescricao(evento: ChangeEvent<HTMLTextAreaElement>) {
        const texto = evento.target.value;
        if (texto.length <= 180) {
            setDescricao(texto);
        }
    }

    return (
        <div className="min-h-screen bg-white p-6 font-primary">
            <h1 className="text-3xl font-bold text-orange-text mb-6">Meu Perfil</h1>

            {/*foto de perfil e descrição*/}
            <div className="flex gap-6 items-start mb-10">

                {/*foto de perfil*/}
                <div className="text-center">
                    <label htmlFor="inputImagem" className="cursor-pointer">
                        <img
                            src={imagem || "https://via.placeholder.com/100"}
                            alt="Foto de perfil"
                            className="w-28 h-28 rounded-full object-cover border border-gray-400"
                        />
                    </label>

                    <input
                        id="inputImagem"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={trocarImagem}
                    />
                    <p className="mt-2 font-medium">Foto de Perfil</p>
                </div>


                {/*descrição*/}
                <div className="flex-1">
          <textarea
              className="w-full h-24 p-2 border border-gray-400 rounded resize-none"
              placeholder="Descrição (máx: 180 caracteres)"
              value={descricao}
              onChange={escreverDescricao}
          />
                    <p className="text-sm text-gray-500 mt-1"></p>
                </div>
            </div>
        </div>
    );
}

export default MeuPerfil;
