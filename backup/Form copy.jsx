import React, { useState } from "react";
import {
  limparCPF,
  formatarCPF,
  validarCPF
} from "../../utils/cpfUtils";

import {
  User,
  Calendar,
  CreditCard,
  Briefcase,
  Layers,
  DollarSign,
  FileImage,
  Hash,
  Send,
  Mail,
  LogIn
} from "lucide-react";

import Header from "../components/Header";
//import "";
//import Login from "./page/Login.jsx";

export default function App() {
  const [formData, setFormData] = useState({
    nome: "",
    data_nascimento: "",
    cpf: "",
    cargo: "",
    departamento: "",
    email: "",
    admissao: "",
    tipo_contrato: "",
    salario: "",
    foto: null,
  });

  // Atualização com formatação para CPF
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    let newValue = files ? files[0] : value;

    if (name === "cpf") {
      newValue = formatarCPF(value); // Aplica máscara no input
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação de CPF (opcional)
    const cpfValido = validarCPF(formData.cpf);
    if (!cpfValido) {
      alert("CPF inválido.");
      return;
    }

    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK;
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      // Se for o CPF, envia sem formatação
      if (key === "cpf") {
        data.append(key, limparCPF(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    });

    fetch(webhookUrl, {
      method: "POST",
      body: data,
    })
      .then(() => alert("Colaborador cadastrado com sucesso!"))
      .catch(() => alert("Erro ao enviar dados."));
  };

  return (

  
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-500 p-4">
      <Header />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Cadastro de Colaborador
        </h2>

        {/* Nome */}
        <div className="flex items-center border rounded-lg p-2">
          <User className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={formData.nome}
            onChange={handleChange}
            className="w-full outline-none"
            required
          />
        </div>

        {/* Data de nascimento */}
        <div className="flex items-center border rounded-lg p-2">
          <Calendar className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="date"
            name="data_nascimento"
            value={formData.data_nascimento}
            onChange={handleChange}
            className="w-full outline-none"
            required
          />
        </div>

        {/* CPF */}
        <div className="flex items-center border rounded-lg p-2">
          <CreditCard className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            maxLength={14}
            value={formData.cpf}
            onChange={handleChange}
            className="w-full outline-none"
            required
          />
        </div>

        {/* Cargo */}
        <div className="flex items-center border rounded-lg p-2">
          <Briefcase className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            name="cargo"
            placeholder="Cargo / Função"
            value={formData.cargo}
            onChange={handleChange}
            className="w-full outline-none"
            required
          />
        </div>

        {/* Departamento */}
        <div className="flex items-center border rounded-lg p-2">
          <Layers className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            name="departamento"
            placeholder="Departamento"
            value={formData.departamento}
            onChange={handleChange}
            className="w-full outline-none"
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center border rounded-lg p-2">
          <Mail className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full outline-none"
            required
          />
        </div>

        {/* Data de admissão */}
        <div className="flex items-center border rounded-lg p-2">
          <Calendar className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="date"
            name="admissao"
            value={formData.admissao}
            onChange={handleChange}
            className="w-full outline-none"
            required
          />
        </div>

        {/* Tipo de contrato */}
        <div className="flex items-center border rounded-lg p-2">
          <Hash className="w-5 h-5 text-gray-500 mr-2" />
          <select
            name="tipo_contrato"
            value={formData.tipo_contrato}
            onChange={handleChange}
            className="w-full outline-none bg-transparent"
            required
          >
            <option value="">Tipo de contrato</option>
            <option value="CLT">CLT</option>
            <option value="PJ">PJ</option>
            <option value="Estágio">Estágio</option>
            <option value="Temporário">Temporário</option>
          </select>
        </div>

        {/* Salário */}
        <div className="flex items-center border rounded-lg p-2">
          <DollarSign className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="number"
            name="salario"
            placeholder="Salário base (R$)"
            value={formData.salario}
            onChange={handleChange}
            className="w-full outline-none"
            required
          />
        </div>

        {/* Foto */}
        <div className="flex items-center border rounded-lg p-2">
          <FileImage className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="file"
            name="foto"
            accept="image/*"
            onChange={handleChange}
            className="w-full outline-none"
          />
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center p-3 gap-2"
        >
          Cadastrar Colaborador <Send />
        </button>
      </form>
       {/* <Login /> */}
    </div>
  );
}
