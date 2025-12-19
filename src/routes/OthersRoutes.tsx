import { Route, Routes, useLocation } from "react-router-dom";

import ProtectedRoute from '@/routes/ProtectedRoute';

import Login from '@/pages/auth/sign-in'
import Register from '@/pages/auth/sign-up'

import Header from '@/components/header'
import Dashboard from "@/pages/others/Dashboard";
import Despesas from "@/pages/others/Despesas";
import Perfil from "@/pages/others/Perfil";
import Ajustes from "@/pages/others/Ajustes";

export default function OthersRoutes() { 
    const location = useLocation();
    const noHeaderRoutes = ['/login', '/register'];
    const showHeader = !noHeaderRoutes.some(route => 
        location.pathname.endsWith(route)
    );
    
    return (
        <>
            {showHeader && <Header />}
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="despesas" element={<ProtectedRoute><Despesas /></ProtectedRoute>} />
                <Route path="perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
                <Route path="ajustes" element={<ProtectedRoute><Ajustes /></ProtectedRoute>} />
            </Routes>
        </>
    )
}