import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from '@/routes/ProtectedRoute';
import AppLayout from "@/layouts/app-layout";

import Login from '@/pages/auth/sign-in'
import Register from '@/pages/auth/sign-up'

import Dashboard from "@/pages/others/Dashboard";
import Despesas from "@/pages/others/Despesas";
import Ajustes from "@/pages/others/Ajustes";

import Perfil from "@/pages/others/sub-pages/Perfil";
import Temas from "@/pages/others/sub-pages/Temas";
import Notificacoes from "@/pages/others/sub-pages/Notificacoes";
import Assinatura from "@/pages/others/sub-pages/Assinatura";
import Success from "@/pages/others/success";
import Cancel from "@/pages/others/cancel";

import { useUser } from '@/context/UserContext';

export default function OthersRoutes() { 
    const { usuario } = useUser();
    
    return (
        <>
            <Routes>
                <Route element={<AppLayout />}>
                <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="despesas" element={<ProtectedRoute><Despesas /></ProtectedRoute>} />
                <Route path="ajustes" element={<ProtectedRoute><Ajustes /></ProtectedRoute>}>
                    <Route index element={<Perfil />} />
                        <Route path="perfil" element={<Perfil />} />
                        <Route path="temas" element={<Temas />} />
                        <Route path="notificacoes" element={<Notificacoes />} />
                        <Route path="assinatura" element={<Assinatura />} />
                    </Route>
                </Route>
                <Route path="success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
                <Route path="cancel" element={<ProtectedRoute><Cancel /></ProtectedRoute>} />
                
                <Route path="login" element={usuario ? <Navigate to="dashboard"/> : <Login />} />
                <Route path="register" element={usuario ? <Navigate to="dashboard"/> : <Register />} />
            
                <Route path="*" element={<Navigate to={usuario ? "/dashboard" : "/login"} replace />} />
            </Routes>
        </>
    )
}