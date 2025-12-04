import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import Teste from './pages/DashboardPage'


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Teste />
    </BrowserRouter>
  </React.StrictMode>,
)
