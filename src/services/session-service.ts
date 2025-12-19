import api from './api';
import { clearAccessToken } from './auth-token';

export async function Logout() {
  try
  {
    await api.post("/Auth/Logout");
  }
  catch
  {
    console.warn("Logout no backend falhou, limpando sessão local.")
  }
  finally
  {
    clearAccessToken();
    localStorage.removeItem("usuario");
    window.location.href = "/app/login";
  }
}