import { Navigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { usuario, loading } = useUser();

  if (loading) {
    return <div>Carregando...</div>; // Ou um Spinner
  }

  // 2. Se terminou de carregar e não tem usuário, aí sim manda para o login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // 3. Se tem usuário, libera o acesso
  return <>{children}</>;
}