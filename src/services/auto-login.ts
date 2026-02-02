import api from "./api";
import { setAccessToken } from "./auth-token";

export async function autoLogin() {
  try {
    const { data } = await api.post("Auth/auto-login");

    if (data.accessToken) {
      setAccessToken(data.accessToken);
      api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
    }

    if (data.usuario) {
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
    }

    return data.usuario;
  } catch (error) {
    localStorage.removeItem("usuario");
    localStorage.removeItem("accessToken"); 
    throw error; 
  }
}
