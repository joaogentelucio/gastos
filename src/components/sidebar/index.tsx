import { Link } from 'react-router-dom';
import styles from './sidebar.module.css'; 

export function Sidebar() {
  return (
    <div className={styles.container}>
      <h3>Menu</h3>
      <ul className={styles.navList}>
        <li>
          <Link to="/dashboard" className={styles.navLink}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/despesas" className={styles.navLink}>
            Despesas
          </Link>
        </li>
      </ul>
      <div className={styles.btn}>
        <button onClick={() => console.log('Logout')}>
          Sair
        </button>
      </div>
    </div>
  );
};