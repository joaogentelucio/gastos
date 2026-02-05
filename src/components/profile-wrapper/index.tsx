import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { FaChevronDown } from 'react-icons/fa';
import styles from './styles.module.css'
import api from "@/services/api";
import { useTheme } from '@/context/ThemeContext';
import { useUser } from '@/context/UserContext';
import defaultProfileImg from '../../assets/imagemDefault.png';

export default function ProfileWrapper() {
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

    return(
        <div className={styles.profileWrapper} ref={profileMenuRef}>
      <div className={styles.profileTrigger} onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
        <img
          src={fotoUrl}
          className={styles.fotoPerfil}
          style={{ 
            borderColor: theme.colors.bottom, // Cor da borda do tema
            backgroundColor: theme.colors.background2 
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = defaultProfileImg;
          }}
          alt="Profile"
        />
        <FaChevronDown 
          className={`${styles.arrowIcon} ${isProfileMenuOpen ? styles.rotated : ""}`} 
          style={{ color: theme.colors.text, fontSize: '0.8rem' }}
        />
      </div>

      {isProfileMenuOpen && (
        <div 
          className={styles.menuHeader}
          style={{ 
            backgroundColor: theme.colors.background2, 
            color: theme.colors.text,
            border: `1px solid ${theme.colors.bottom}`,
            boxShadow: `0 10px 25px rgba(0,0,0,0.3)`
          }}
        >
          <div className={styles.userInfo} style={{ borderBottom: `1px solid ${theme.colors.bottom}` }}>
            <span className={styles.userName} style={{ color: theme.colors.text }}>
              {usuario?.Nome}
            </span>
          </div>
          
          <div className={styles.menuActions}>
            <Link 
              to="/ajustes" 
              onClick={() => setIsProfileMenuOpen(false)} // Fecha ao clicar
              style={{ 
                color: theme.colors.text,
                transition: '0.2s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = theme.colors.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = theme.colors.text)}
            >
              Ajustes
            </Link>
          </div>
        </div>
      )}
    </div>
    )
}