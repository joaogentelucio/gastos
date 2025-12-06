import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css'; 
import { FaHome, FaUserCircle } from 'react-icons/fa';

interface SidebarProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
}

export function Sidebar({isMenuOpen, closeMenu}: SidebarProps) {
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
    <nav ref={navRef} className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
      <h3>Menu</h3>
      <button
        className={styles.closeMenuIcon} 
        onClick={closeMenu}
        aria-label="Fechar menu"
      >
        &times; 
      </button>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/app/dashboard" onClick={closeMenu} className={styles.navLink}>
           <FaHome className={styles.navIcon} />
            Dashboard
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/app/despesas" onClick={closeMenu} className={styles.navLink}>
            <FaUserCircle className={styles.navIcon} />
            Despesas
          </Link>
        </li>
      </ul>
      <div className={styles.btn}>
        <button onClick={() => console.log('Logout')}>
          Sair
        </button>
      </div>
    </nav>
  );
};