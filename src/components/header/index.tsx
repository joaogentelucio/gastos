import { FaBars } from 'react-icons/fa';
import styles from './styles.module.css'
import { useTheme } from '@/context/ThemeContext';
import ProfileWrapper from '../profile-wrapper';

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Header({isSidebarOpen, toggleSidebar }: HeaderProps) {
  const { theme } = useTheme();

  return (
    <header 
      className={`${styles.header} ${isSidebarOpen ? styles.headerWithSidebar : styles.headerFull}`}
      style={{ backgroundColor: theme.colors.background, borderBottomColor: theme.colors.bottom, color: theme.colors.text }}
    >
      <button
        className={styles.menuIcon}
        onClick={toggleSidebar}
        style={{ color: theme.colors.text }}
        aria-label="Toggle sidebar"
      >
        <FaBars />
      </button>

      <ProfileWrapper />
      
    </header>
  )
}