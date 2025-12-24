import api from "./api";
import { setAccessToken } from "./auth-token";

export async function autoLogin() {
  try {
    // A chamada depende exclusivamente do RefreshToken (Cookie)
    const { data } = await api.post("Auth/auto-login");

    if (data.accessToken) {
      setAccessToken(data.accessToken);
      // Força o axios a usar o novo token imediatamente
      api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    }

    if (data.usuario) {
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
    }

    return data.usuario;
  } catch (error) {
    // Se o cookie expirou ou sumiu, limpamos o lixo do localStorage
    localStorage.removeItem("usuario");
    localStorage.removeItem("accessToken"); // ou a chave que você usa
    throw error; // Repassa o erro para o AuthInitializer redirecionar
  }
}
