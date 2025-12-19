import api from './api';

export async function Register(
  fotoPerfil: File | null,
  nome: string,
  email: string,
  senha: string,
) {
    const formData = new FormData();

    formData.append('Nome', nome);
    formData.append('Email', email.toUpperCase());
    formData.append('Senha', senha);

    if (fotoPerfil) {
        formData.append('FotoPerfilFile', fotoPerfil);
    }

    const response = await api.post(
        "/Usuario/InserirUsuario", 
        formData, 
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );

    return response.data;
}