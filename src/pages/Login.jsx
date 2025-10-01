import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import React from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      toast.success("Login realizado com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      navigate("/cadastro");
    }
  };

  return (
    <div className="min-h-screen min-w-screen  flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex w-full max-w-4xl min-h-[600px] min-w-[1000px]">
        {/* Lado da imagem */}
        <div className="hidden md:flex w-1/2 bg-blue-600 items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df"
            alt="Ilustração Login"
            className="w-3/4 h-auto drop-shadow-lg min-h-[600px] min-w-[500px]"
          />
        </div>

        {/* Lado do formulário */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Bem-vindo 👋
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="flex items-center border rounded-xl p-3">
              <Mail className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="Email"
                className="w-full outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Senha */}
            <div className="flex items-center border rounded-xl p-3">
              <Lock className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="password"
                placeholder="Senha"
                className="w-full outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2 transition"
            >
              Entrar <LogIn />
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            Não tem conta?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
