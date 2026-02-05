import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaUser, FaBell, FaChevronLeft, FaBrush, FaCreditCard, FaSignOutAlt } from 'react-icons/fa';
import styles from './styles.module.css';
import { useTheme } from '@/context/ThemeContext';
import { Logout } from '@/services/logout-service';

export function SidebarAjustes() {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme } = useTheme();

    const [origemFixa] = useState(location.state?.from || '/dashboard');

    const handleBack = () => {
        navigate(origemFixa);
    };
  return (
    <aside className={styles.sidebar} style={{ backgroundColor: theme.colors.background3}}>
        <div className={styles.navTop}>
          <div className={styles.backBtn} onClick={handleBack} title="Voltar" style={{ color: theme.colors.text}}>
            <FaChevronLeft />
          </div>
          
          <div className={styles.menuItem} onClick={() => navigate('perfil')} style={{ color: theme.colors.text}}>
            <FaUser size={22} />
            <span>Perfil</span>
          </div>

          <div className={styles.menuItem} onClick={() => navigate('temas')} style={{ color: theme.colors.text}}>
            <FaBrush size={22} />
            <span>Tema</span>
          </div>
          
          <div className={styles.menuItem} onClick={() => navigate('notificacoes')} style={{ color: theme.colors.text}}>
            <FaBell size={22} />
            <span>Notificações</span>
          </div>
          <div className={styles.menuItem} onClick={() => navigate('assinatura')} style={{ color: theme.colors.text}}>
            <FaCreditCard size={22} />
            <span>Assinatura</span>
          </div>
        </div>

        <button className={styles.logout} onClick={Logout}>
            <FaSignOutAlt size={22} />
            <span className={styles.logoutText}>Encerrar sessão</span>
        </button>
      </aside>
  );
}