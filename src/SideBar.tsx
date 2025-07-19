/* 
  <li><a href="/perfil">Perfil</a></li>       -> recarrega toda a página
  <li><Link to="/perfil">Perfil</Link></li>   -> recarrga apenas o componente MeuPerfil
*/
import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, House, PlusCircle, DotsThreeOutlineVertical , SignOut } from 'phosphor-react';

export function SideBar() {
  return (
    <div className="sidebar items-center justify-center bg-white text-black p-4 w-60 h-screen border-r-4 border-black">
      <img src="assets/logo_preta.png" alt="Logo" />

      <ul className="space-y-4 items-center justify-center">
        <li>
          <Link to="/perfil" className="flex items-center gap-3 p-3 rounded-lg transition-colors">
            <UserCircle />
            <span>Perfil</span>
          </Link>
        </li>
        <li>
          <Link
            to="/feed" className="flex items-center gap-3 p-3 rounded-lg transition-colors">
            <House />
            <span>Feed</span>
          </Link>
        </li>
        <li>
          <Link to="/postar" className="flex items-center gap-3 p-3 rounded-lg transition-colors">
            <PlusCircle />
            <span>Postar</span>
          </Link>
        </li>
        <li>
          <Link to="/editar" className="flex items-center gap-3 p-3 rounded-lg transition-colors">
            <DotsThreeOutlineVertical />
            <span>Editar</span>
          </Link>
        </li>
        <li>
          <Link to="/sair" className="flex items-center gap-3 p-3 rounded-lg transition-colors">
            <SignOut />
            <span>Sair</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
