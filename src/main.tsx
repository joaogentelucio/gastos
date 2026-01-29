import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import './styles/index.css'
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
//import { AuthInitializer } from './context/AuthContext';
import App from './App'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
    <BrowserRouter basename="/">
      <ThemeProvider>
        <UserProvider>
            <App />
      </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)
