import React, { useState } from "react";
import { limparCPF, formatarCPF, validarCPF } from "../../utils/cpfUtils";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  LogOut,
} from "lucide-react";

import Header from "../components/Header";

export default function Cadastro() {
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    let newValue = files ? files[0] : value;

    if (name === "cpf") {
      newValue = formatarCPF(value);
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cpfValido = validarCPF(formData.cpf);
    if (!cpfValido) {
      toast.error("CPF inválido.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK;
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
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
      .then(() => {
        toast.success("Colaborador cadastrado com sucesso!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        // Resetar o formulário depois do sucesso
        setFormData({
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
      })
      .catch(() => {
        toast.error("Erro ao enviar dados.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      });
  };

  return (
    <div className="min-h-screen min-w-screen items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-0 overflow-y-hidden">
      {/* Header fixo */}
      <Header />

      {/* Formulário centralizado */}
      <div className="min-h-screen min-w-screen flex items-center justify-center p-10 pt-24">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 m-2 gap-3 rounded-4xl shadow-md w-full max-w-4xl grid grid-cols-1 md:grid-cols-2"
        >
          <h2 className="text-4xl font-bold text-center mb-4 col-span-2">
            Cadastro de Colaborador
          </h2>

          {/* Nome - 1 grid (full) */}
          <div className="col-span-2">
            <span>Nome Completo:</span>
            <div className="flex items-center rounded-[4px] p-3 border hover:border-blue-500 transition cursor-pointer">
              <User className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                name="nome"
                placeholder="Digite o nome..."
                value={formData.nome}
                onChange={handleChange}
                className="w-full outline-none"
                required
              />
            </div>
          </div>

          {/* Data de nascimento */}

          <div>
            <span>Data de Nascimento:</span>
            <div className="flex items-center border hover:border-blue-500 transition cursor-pointer rounded-[4px] p-3 col-span-1">
              <Calendar className="w-5 h-5 text-gray-500 mr-2" />

              <input
                type="date"
                name="data_nascimento"
                placeholder="Data de nascimento..."
                value={formData.data_nascimento}
                onChange={handleChange}
                className="w-full outline-none"
                required
              />
            </div>
          </div>

          {/* CPF */}

          <div className="">
            <span>CPF:</span>
            <div className="flex items-center border  hover:border-blue-500 transition cursor-pointer rounded-[4px] p-3">
              <CreditCard className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                name="cpf"
                placeholder="Digite o CPF..."
                maxLength={14}
                value={formData.cpf}
                onChange={handleChange}
                className="w-full outline-none"
                required
              />
            </div>
          </div>

          {/* Cargo */}

          <div className="">
            <span>Cargo:</span>
            <div className="flex items-center border  hover:border-blue-500 transition cursor-pointer rounded-[4px] p-3">
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
          </div>

          {/* Departamento */}

          <div className="">
            <span>Departamento:</span>
            <div className="flex items-center border  hover:border-blue-500 transition cursor-pointer rounded-[4px] p-3">
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
          </div>

          {/* Email - full */}

          <div className="col-span-2">
            <span>Email:</span>
            <div className="flex items-center border  hover:border-blue-500 transition cursor-pointer rounded-[4px] p-3 col-span-2">
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
          </div>

          {/* Admissão */}
          <div className="">
            <span>Admissão:</span>
            <div className="flex items-center border  hover:border-blue-500 transition cursor-pointer rounded-[4px] p-3">
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
          </div>

          {/* Tipo de contrato */}
          <div className="">
            <span>Tipo de Contrato:</span>
            <div className="flex items-center border  hover:border-blue-500 transition cursor-pointer rounded-[4px] p-3">
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
          </div>

          {/* Salário */}
          <div className="">
            <span>Salário:</span>
            <div className="flex items-center border  hover:border-blue-500 transition cursor-pointer rounded-[4px] p-3">
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
          </div>

          {/* Foto */}
          <div className="">
            <span>Foto:</span>
            <div className="flex items-center border  hover:border-blue-500 transition cursor-pointer rounded-[4px] p-3 cursor-pointer">
              <FileImage className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="file"
                name="foto"
                accept="image/*"
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Botão - full */}
          <button
            type="submit"
            className="col-span-1 w-full bg-blue-600 mt-4 text-white p-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
          >
            Cadastrar Colaborador <Send className="ml-3" />
          </button>
        </form>
      </div>
    </div>
  );
}
