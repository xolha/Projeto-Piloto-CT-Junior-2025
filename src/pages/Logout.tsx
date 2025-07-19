import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// interface para as props
interface LogoutProps {
    onLogout: () => void;
}

// interface para tipar as props
export const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
    const navigate = useNavigate();

    // useEffect para executar a lógica assim que o componente for montado
    useEffect(() => {
        Cookies.remove('auth_token');
        onLogout();
        navigate('/login');
    }, 
    // O array de dependências garante que isso rode apenas uma vez
    [onLogout, navigate]); 

    return (
        <div className="flex h-full items-center justify-center">
            <p className="text-xl">Saindo...</p>
        </div>
    );
};
