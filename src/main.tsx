import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeConctext';
import App from './App'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <App />
      </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
