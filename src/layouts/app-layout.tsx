import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import styles from './app-layout.module.css';

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const noHeaderRoutes = ['/login', '/register', '/ajustes', '/perfil', 'temas', 'notificacoes'];
  const showHeader = !noHeaderRoutes.some(route =>
    location.pathname.endsWith(route)
  );

  return (
    <div className={styles.layout}>
      {showHeader && (
        <>
          <Header
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(prev => !prev)}
          />
          <Sidebar
            isMenuOpen={isSidebarOpen}
            closeMenu={() => setIsSidebarOpen(false)}
          />
        </>
      )}

      <main
        className={`
          ${styles.content} 
          ${showHeader 
            ? (isSidebarOpen ? styles.open : styles.closed) 
            : styles.fullContent 
          }
        `}
      >
        <Outlet />
      </main>
    </div>
  );
}
