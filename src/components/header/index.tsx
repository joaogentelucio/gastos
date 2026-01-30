import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
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
    <header 
      className={`${styles.header} ${isSidebarOpen ? styles.headerWithSidebar : styles.headerFull}`}
      style={{ backgroundColor: theme.colors.bottom, color: theme.colors.text }}
    >
      <button
        className={styles.menuIcon}
        onClick={toggleSidebar}
        style={{ color: theme.colors.text }}
        aria-label="Toggle sidebar"
      >
        &#9776;
      </button>
      <div className={styles.profileWrapper} ref={profileMenuRef}>
        {/* Gatilho do Menu: Foto + Seta */}
        <div className={styles.profileTrigger} onClick={handleProfileClick}>
          <img
            src={fotoUrl}
            className={styles.fotoPerfil}
            style={{ borderColor: theme.colors.bottom }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = defaultProfileImg;
            }}
            alt="Profile"
          />
          <span className={styles.arrowIcon}>▼</span>
        </div>

        {isProfileMenuOpen && (
          <div 
            className={styles.menuHeader}
            style={{ backgroundColor: theme.colors.background2, color: theme.colors.text }}
            >
            <div className={styles.userInfo}>
              <span className={styles.userName}>{usuario?.Nome}</span>
            </div>
            <div className={styles.menuActions}>
              <Link to="/ajustes" style={{ color: theme.colors.primary }}>
                Ajustes
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}