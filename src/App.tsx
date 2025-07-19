import React, { useState, useEffect, type JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { SideBar } from './SideBar';
import { MeuPerfil } from './MeuPerfil';
import { Feed } from './Feed';
import { Postar } from "./Postar.tsx";
import { Login } from "./pages/Login.tsx";
import { Logout } from "./pages/Logout.tsx";
import { Register } from "./pages/Register.tsx";

// --- Componente de Rota Protegida ---
interface ProtectedRouteProps {
    isAuthenticated: boolean;
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
    if (!isAuthenticated) {
        // Se o usuário não estiver autenticado, redireciona para a página de login.
        return <Navigate to="/login" replace />;
    }
    // Se estiver autenticado, mostra a página solicitada.
    return children;
};

// --- Componente Principal da Aplicação ---
export function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedAuth = localStorage.getItem('isAuthenticated');
        return storedAuth === 'true';
    });

    useEffect(() => {
        localStorage.setItem('isAuthenticated', String(isAuthenticated));
    }, [isAuthenticated]);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated');
    };

    return (
        <div className="flex h-screen">
            {/* O SideBar só aparece se o usuário estiver autenticado */}
            {isAuthenticated && <SideBar />}

            <div className="flex-1 overflow-auto bg-gray-50 p-4">
                {/* Todas as rotas ficam dentro de <Routes> */}
                <Routes>
                    {/* ROTA PÚBLICA: LOGIN, CADASTRO*/}
                    <Route
                        path="/login"
                        element={
                            !isAuthenticated ? (
                                // Se o usuário não estiver logado tentar ir para /login, é redirecionado para o login
                                <Login onLoginSuccess={handleLogin} />
                            ) : (
                                // Se o usuário já logado tentar ir para /login, é redirecionado para o feed
                                <Navigate to="/feed" replace />
                            )
                        }
                    />

                    <Route
                        path="/cadastro"
                        element={
                            !isAuthenticated ? (
                                <Register />
                            ) : (
                                // Se o usuário já logado tentar ir para /cadastro, é redirecionado para o feed
                                <Navigate to="/feed" replace />
                            )
                        }
                    />

                    {/* ROTAS PROTEGIDAS */}
                    <Route
                        path="/perfil"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <MeuPerfil />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/feed"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Feed />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/postar"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                <Postar />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/sair"
                        element={
                            <ProtectedRoute isAuthenticated={isAuthenticated}>
                                {/* chama a função de logout como prop */}
                                <Logout onLogout={handleLogout} />
                            </ProtectedRoute>
                        }
                    />

                    {/* ROTA PADRÃO (Fallback) */}
                    {/* Se o usuário digitar qualquer outra URL, ele será redirecionado */}
                    <Route
                        path="*"
                        element={<Navigate to={isAuthenticated ? "/feed" : "/login"} replace />}
                    />
                </Routes>
            </div>
        </div>
    );
}
