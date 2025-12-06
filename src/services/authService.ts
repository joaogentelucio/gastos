import api from "./api";

export async function Login(email: string, senha: string) {
  const emailUpperCase = email.toUpperCase();
  
  const response = await api.post("/Auth/AutenticarUsuario", {
    email: emailUpperCase,
    senha
  });

  const { accessToken, usuario, qrCode } = response.data;

  if (accessToken) localStorage.setItem("accessToken", accessToken);
  if (qrCode) localStorage.setItem("qrCode", qrCode);
  if (usuario) localStorage.setItem("usuario", JSON.stringify(usuario));


  return { accessToken, usuario, qrCode };
}

export async function Register(
  fotoPerfil: File | null,
  nome: string,
  email: string,
  senha: string,
  papel: "AUTONOMO" | "EMPRESA" ,
  nomeFantasia?: string,
  cnpj?: string
) {
  const formData = new FormData();

  formData.append('Nome', nome);
  formData.append('Email', email.toUpperCase());
  formData.append('Senha', senha);
  formData.append('Papel', papel); 
  formData.append('Slug', nome.toLowerCase().replace(/\s+/g, '-')); 

  if (papel === 'EMPRESA') {
    if (nomeFantasia) formData.append('NomeFantasia', nomeFantasia);
    if (cnpj) formData.append('Cnpj', cnpj);
  }

  if (fotoPerfil) {
    formData.append('FotoPerfilFile', fotoPerfil);
  }

  
  const response = await api.post("/Usuario/InserirUsuario", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
}

export async function logout() {
  await api.post("/Auth/Logout");
  localStorage.removeItem("accessToken");
}