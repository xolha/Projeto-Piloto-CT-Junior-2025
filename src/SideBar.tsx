/* 
  <li><Link to="/perfil">Perfil</Link></li>   -> recarrga apenas o componente MeuPerfil
  <li><a href="/perfil">Perfil</a></li>       -> recarrega toda a página
*/

import React from 'react';
import { Link } from 'react-router-dom';

export function SideBar() {
  return (

<div className="sidebar  bg-white text-black p-4 w-60 h-screen border-r-4 border-orange-500">
      <img src="assets/Logo.png" alt="Logo" />
      
      <ul className="space-y-4">
        <li>
          <Link to="/perfil" className="flex items-center gap-2">
            <img src="assets/account_circle.png" alt="Ícone de Perfil" className="w-5 h-5" />
            <span>Perfil</span>
          </Link>
        </li>
        <li>
          <Link to="/feed" className="flex items-center gap-2 ">
            <img src="assets/Home.png" alt="Ícone de Feed" className="w-5 h-5" />
            <span>Feed</span>
          </Link>
        </li>
        <li>
          <Link to="/postar" className="flex items-center gap-2">
            <img src="assets/icon.png" alt="Ícone de Postar" className="w-5 h-5" />
            <span>Postar</span>
          </Link>
        </li>
        <li>
          <Link to="/editar" className="flex items-center gap-2">
            <img src="assets/more_vert.png" alt="Ícone de Editar" className="w-5 h-5" />
            <span>Editar</span>
          </Link>
        </li>
        <li>
          <Link to="/sair" className="flex items-center gap-2">
            <img src="assets/keyboard_return.png" alt="Ícone de Sair" className="w-5 h-5" />
            <span>Sair</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
