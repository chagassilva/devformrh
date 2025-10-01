import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) navigate("/login");
        else setUser(session.user); // atualiza user se já estiver logado
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.error("Deslogado com sucesso!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        <User className="w-6 h-6" />
        <span className="text-xl font-bold">
          Olá, {user?.user_metadata?.display_name || "Usuário"}
        </span>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
      >
        <LogOut className="w-5 h-5" />
        Sair
      </button>
    </header>
  );
}
