import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
//import RegisterPage from './pages/RegisterPage';

import DashboardPage from './pages/DashboardPage';
import StandardExpensesPage from './pages/Despesas';
import Sidebar from './components/sidebar';

const DashboardLayout = () => (
  <div style={{ display: 'flex' }}>
    <Sidebar />
    <main style={{ flexGrow: 1, padding: '20px' }}>
      <Outlet /> 
    </main>
  </div>
);

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/*<Route path="/register" element={<RegisterPage />} />*/}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} /> 
          <Route path="gastos-padroes" element={<StandardExpensesPage />} />
        </Route>
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
    </Router>
  );
};

export default App;