import { Navigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { usuario, loading } = useUser();

  if (loading) {
    return <div>Carregando...</div>; 
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}