"use client"

import MeuPerfil from 'src/components/MeuPerfil'
import { SideBar } from 'src/components/SideBar'

export default function PerfilPage() {
  return (
    <div className="flex h-screen w-full">
      <SideBar />
      <div className="flex-1 overflow-auto bg-gray-50 pt-16 pb-16 md:pt-0 md:pb-0">
        <MeuPerfil />
      </div>
    </div>
  )
} 