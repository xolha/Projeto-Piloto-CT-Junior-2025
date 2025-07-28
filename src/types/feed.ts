{/*infos do back - tem q ficar fora da função*/}
export type Post = {
    id: string;
    imagem: string;
    descricao: string;

    user: {
        image: string;
        nome: string;
        avatar: string;
    };
};