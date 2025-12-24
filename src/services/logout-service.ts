import api from './api';
import { clearAccessToken } from './auth-token';

export async function Logout() {
  try {
    // Tenta avisar o backend para invalidar o cookie
    await api.post("/Auth/Logout");
  } catch {
    console.warn("Logout no backend falhou, limpando sessão local.");
  } finally {
    clearAccessToken();

    localStorage.clear(); 

    window.location.href = "/app/login";
  }
}