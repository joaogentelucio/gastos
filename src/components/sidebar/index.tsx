import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import styles from './sidebar.module.css'; 
import { useTheme } from '@/context/ThemeContext';

interface SidebarProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

export function Sidebar({isMenuOpen, closeMenu}: SidebarProps) {
  const { theme } = useTheme();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
    
    if (
      isMenuOpen &&
      navRef.current &&
      !navRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest('#menu-toggle') && 
      !(event.target as HTMLElement).closest('[for="menu-toggle"]') 
    ) 
    {
      closeMenu();
    }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <nav ref={navRef} className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`} style={{ backgroundColor: theme.colors.background}}>
      <h3 style={{ color: theme.colors.text}}>Menu</h3>
      <button
        className={styles.closeMenuIcon} 
        style={{ color: theme.colors.text}}
        onClick={closeMenu}
        aria-label="Fechar menu"
      >
        &times; 
      </button>
      <ul className={styles.navList} style={{ color: theme.colors.text}}>
        <li className={styles.navItem}>
          <Link to="/dashboard" onClick={closeMenu} className={styles.navLink}>
           <FaHome className={styles.navIcon} />
            Dashboard
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/despesas" onClick={closeMenu} className={styles.navLink}>
            <FaUserCircle className={styles.navIcon} />
            Despesas
          </Link>
        </li>
      </ul>
    </nav>
  );
};