import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

// interface para as props que o componente vai receber
interface LoginProps {
  onLoginSuccess: () => void;
}

// interface para tipar o componente e desestruturar a prop
export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", login);
    console.log("Senha:", senha);

    // --- LÓGICA DE VALIDAÇÃO AQUI ---

    // atualizar o estado global
    onLoginSuccess();
    navigate('/feed');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-700">
      <form
        onSubmit={handleSubmit}
        className="bg-green-900 p-8 rounded shadow-md w-[350px] flex flex-col items-center"
      >
        <img src="assets/logo_branca.png" alt="Logo CT" className="mb-8" />

        <div className="mb-4 w-full">
          <input
            id="login"
            type="text"
            placeholder="Login"
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-200 text-black"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>

        <div className="mb-6 w-full">
          <input
            id="senha"
            type="password"
            placeholder="Senha"
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-200 text-black"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="text-black w-full bg-orange-600 hover:bg-orange-700 py-2 rounded font-bold transition-colors"
        >
          Entrar
        </button>

        <div className="mt-4 text-center text-white">
          <a href="" className="hover:underline">
            Não possui senha?
          </a>
        </div>

        <div className="mt-2 text-center text-white">
          <Link to="/cadastro" className="hover:underline">
            Clique aqui para se cadastrar!
          </Link>
        </div>
      </form>
    </div>
  );
}
