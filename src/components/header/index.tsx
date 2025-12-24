import { useState, useEffect, useRef } from 'react';
import { Link, useLocation  } from 'react-router-dom'
import styles from './styles.module.css'
import { useTheme } from '@/context/ThemeContext';
import api from "@/services/api";
import defaultProfileImg from '../../assets/imagemDefault.png';
import { useUser } from '@/context/UserContext';

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Header({isSidebarOpen, toggleSidebar }: HeaderProps) {
  const { theme } = useTheme();
  const { usuario } = useUser();
  const location = useLocation();

  const baseUrl = api.defaults.baseURL?.replace('/api', '') + '/uploads/';
  const temFoto = usuario?.FotoPerfil && usuario.FotoPerfil.trim() !== "" && usuario.FotoPerfil !== "SEM_FOTO";

  const fotoUrl = temFoto
  ? `${baseUrl}${usuario.FotoPerfil}`
  : defaultProfileImg; 

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`${styles.header} ${isSidebarOpen ? styles.headerWithSidebar : styles.headerFull}`}>
      <button
        className={styles.menuIcon}
        onClick={toggleSidebar}
        style={{ color: theme.colors.text }}
        aria-label="Toggle sidebar"
      >
        &#9776;
      </button>
      <div className={styles.profileWrapper} ref={profileMenuRef}>
          <img 
            src={fotoUrl}
            className={styles.fotoPerfil} 
            style={{ borderColor: theme.colors.bottom}}
            onClick={handleProfileClick}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; 
              target.src = defaultProfileImg;
            }}
          />
        {isProfileMenuOpen && (
          <div className={styles.profileMenu} style={{ backgroundColor: theme.colors.background2}}>
            <Link to="/app/ajustes" state={{ from: location.pathname }} style={{ color: theme.colors.text}}>Ajustes</Link>
          </div>
        )}
      </div>
    </header>
  )
}