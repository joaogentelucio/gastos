import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.tsx'
import Teste from './pages/DashboardPage.tsx'
import DashboardPage from './pages/DashboardPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DashboardPage />
  </StrictMode>,
)
