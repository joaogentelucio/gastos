import { Outlet } from 'react-router-dom';
import styles from '@/styles/ajustes.module.css';
import { useTheme } from '@/context/ThemeContext';
import { SidebarAjustes } from '@/components/sidebar-ajustes';

export default function Ajustes() {
  const { theme } = useTheme();
  
  return (
    <div className={styles.container} style={{ backgroundColor: theme.colors.background}}>
      <SidebarAjustes />
      
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
