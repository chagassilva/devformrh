
// utils/cpfUtils.js

// Remove tudo que não for número
export function limparCPF(cpf) {
  return cpf.replace(/\D/g, '');
}

// Aplica a máscara no CPF (000.000.000-00)
export function formatarCPF(cpf) {
  const numeros = limparCPF(cpf);
  if (numeros.length !== 11) return cpf; // Retorna como está se estiver incompleto

  return numeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Validação simples de CPF (existem formas mais avançadas também)
export function validarCPF(cpf) {
  const cleaned = limparCPF(cpf);
  if (!/^\d{11}$/.test(cleaned)) return false;

  // CPF inválidos conhecidos (ex: 111.111.111-11)
  if (/^(\d)\1{10}$/.test(cleaned)) return false;

  // Validação dos dígitos
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned[i]) * (10 - i);
  }
  let firstCheck = (sum * 10) % 11;
  if (firstCheck === 10) firstCheck = 0;
  if (firstCheck !== parseInt(cleaned[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned[i]) * (11 - i);
  }
  let secondCheck = (sum * 10) % 11;
  if (secondCheck === 10) secondCheck = 0;
  if (secondCheck !== parseInt(cleaned[10])) return false;

  return true;
}
