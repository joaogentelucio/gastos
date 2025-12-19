import api from "./api";
import { setAccessToken } from "./auth-token";

export async function Login(email: string, senha: string) {
  const response = await api.post("Auth/AutenticarUsuario", {
    email: email.toUpperCase(),
    senha
  });

  const { accessToken, usuario } = response.data;

  if (accessToken){
    setAccessToken(accessToken);
  }

  if (usuario){
    localStorage.setItem("usuario", JSON.stringify(usuario));
  } 
  
  return { accessToken, usuario };
}



