import styles from './styles.module.css';
import MinhaLogo from '@/assets/logo.svg';

export function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img 
          src={MinhaLogo} 
          alt="Loading..." 
          className={styles.icon} 
        />
      </div>
    </div>
  );
};
