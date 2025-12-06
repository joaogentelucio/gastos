import { Navigate, Routes, Route } from "react-router-dom";

import OthersRoutes from "@/routes/OthersRoutes";


export default function App() {
  const token = localStorage.getItem("accessToken");

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/app/dashboard" replace /> : <Navigate to="/app/login" replace />} />
      <Route path="/app/*" element={<OthersRoutes/>} />
    </Routes>
  );
};
