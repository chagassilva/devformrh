import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, UserPlus } from "lucide-react";
import React from "react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex w-full max-w-4xl min-h-[600px] min-w-[1000px]">
        {/* Lado da imagem */}
        <div className="hidden md:flex w-1/2 bg-blue-600 items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="Ilustração RH"
            className="w-3/4 h-auto drop-shadow-lg min-h-[600px] min-w-[500px]"
          />
        </div>

        {/* Lado do formulário */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Crie sua conta 🚀
          </h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleSignup} className="space-y-5">
            {/* Display Name */}
            <div className="flex items-center border rounded-xl p-3">
              <User className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Nome de exibição"
                className="w-full outline-none"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>

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

            {/* Confirmar Senha */}
            <div className="flex items-center border rounded-xl p-3">
              <Lock className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="password"
                placeholder="Confirmar Senha"
                className="w-full outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Botão */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2 transition"
            >
              Cadastrar <UserPlus />
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            Já tem conta?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
