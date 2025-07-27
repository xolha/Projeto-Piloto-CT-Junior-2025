"use client"
/* 
  <li><a href="/perfil">Perfil</a></li>       -> recarrega toda a página
  <li><Link href="/perfil">Perfil</Link></li>   -> recarrga apenas o componente MeuPerfil
*/
import React from 'react';
import Link from 'next/link';
import { UserCircle, House, PlusCircle, DotsThreeOutlineVertical , SignOut } from 'phosphor-react';

export function SideBar() {
  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b-2 border-black z-50">
        <div className="flex justify-center items-center py-3">
          <img src="/assets/logo_preta.png" alt="Logo" className="h-8" />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col bg-white text-black p-4 w-60 h-screen border-r-4 border-black">
        <div className="flex justify-center mb-8">
          <img src="/assets/logo_preta.png" alt="Logo" className="h-12" />
        </div>

        <ul className="space-y-4 flex-1">
          <li>
            <Link href="/perfil" className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-gray-100">
              <UserCircle size={24} />
              <span>Perfil</span>
            </Link>
          </li>
          <li>
            <Link href="/feed" className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-gray-100">
              <House size={24} />
              <span>Feed</span>
            </Link>
          </li>
          <li>
            <Link href="/postar" className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-gray-100">
              <PlusCircle size={24} />
              <span>Postar</span>
            </Link>
          </li>
          <li>
            <Link href="/editar" className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-gray-100">
              <DotsThreeOutlineVertical size={24} />
              <span>Editar</span>
            </Link>
          </li>
          <li>
            <Link href="/sair" className="flex items-center gap-3 p-3 rounded-lg transition-colors hover:bg-gray-100">
              <SignOut size={24} />
              <span>Sair</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black z-50">
        <div className="flex justify-around items-center py-2">
          <Link href="/perfil" className="flex flex-col items-center gap-1 p-2">
            <UserCircle size={20} />
            <span className="text-xs">Perfil</span>
          </Link>
          <Link href="/feed" className="flex flex-col items-center gap-1 p-2">
            <House size={20} />
            <span className="text-xs">Feed</span>
          </Link>
          <Link href="/postar" className="flex flex-col items-center gap-1 p-2">
            <PlusCircle size={20} />
            <span className="text-xs">Postar</span>
          </Link>
          <Link href="/editar" className="flex flex-col items-center gap-1 p-2">
            <DotsThreeOutlineVertical size={20} />
            <span className="text-xs">Editar</span>
          </Link>
          <Link href="/sair" className="flex flex-col items-center gap-1 p-2">
            <SignOut size={20} />
            <span className="text-xs">Sair</span>
          </Link>
        </div>
      </div>
    </>
  );
}
