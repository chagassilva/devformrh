import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cadastro from "./pages/Cadastro";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Página protegida */}
        <Route
          path="/cadastro"
          element={
            <PrivateRoute>
              <Cadastro />
            </PrivateRoute>
          }
        />

        {/* Redireciona raiz para login ou cadastro */}
        <Route path="/" element={<Navigate to="/cadastro" replace />} />
      </Routes>

      {/* ToastContainer precisa estar fora das rotas */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
