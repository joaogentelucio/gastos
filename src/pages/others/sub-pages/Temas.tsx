import styles from '@/styles/temas.module.css';
import { useTheme } from '@/context/ThemeContext';
import themes from '@/themes'; 

export default function Temas() {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === themes.dark;

    return (
        <div className="container">
            Temas
            <label className={styles.switch} aria-label="Alternar tema">
            <input
                type="checkbox"
                checked={isDark}
                onChange={toggleTheme}
                aria-checked={isDark}
            />
            <span className={styles.slider}>
                <span className={styles.icon}>{isDark ? '🌙' : '☀️'}</span>
            </span>
        </label>
        </div>
    )
}