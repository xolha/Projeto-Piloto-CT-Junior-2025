"use client"

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function SairPage() {
    const router = useRouter();

    // useEffect para executar a lógica assim que o componente for montado
    useEffect(() => {
        Cookies.remove('auth_token');
        // Remove the auth-token cookie used by middleware
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        router.push('/login');
    }, 
    // O array de dependências garante que isso rode apenas uma vez
    [router]); 

    return (
        <div className="flex h-full items-center justify-center">
            <p className="text-xl">Saindo...</p>
        </div>
    );
} 