
/* 
    Mais avançado:
    Router -> usa para navegar entre componentes sem recarregar a página
    Link -> cria um link que, quando clicado, navega para a rota especificada

    Fazendo na unha:
    useState -> hook do React que permite adicionar estado a um componente funcional
*/

import { Routes, Route } from "react-router";
import { SideBar } from './SideBar';
import { MeuPerfil } from './MeuPerfil';

export function App() {
    return (
            <div className="flex">
                <SideBar />
                <div>
                    <Routes>
                        <Route path="/perfil" element={<MeuPerfil />} />
                        {/* <Route path="/feed" element={<Feed />} />
                        <Route path="/postar" element={<Postar />} />
                        <Route path="/editar" element={<Editar />} />
                        <Route path="/sair" element={<Sair />} /> */}

                    </Routes>
                </div>
            </div>
    );
}
