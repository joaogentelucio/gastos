import { FaMoon, FaSun, FaCheckCircle } from 'react-icons/fa';
import styles from '@/styles/temas.module.css';
import { useTheme } from '@/context/ThemeContext';
import themes from '@/themes'; 

export default function Temas() {
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === themes.dark;

    return (
        <div className="container" style={{ backgroundColor: theme.colors.background }}>
            <header className={styles.header}>
                <h2 style={{ color: theme.colors.text }}>Personalização</h2>
                <p style={{ color: theme.colors.text, opacity: 0.7 }}>
                    Escolha a aparência que melhor se adapta ao seu ambiente de trabalho.
                </p>
            </header>
            <div className={styles.themeGrid}>
                {/* Card Modo Claro */}
                <div 
                    className={`${styles.themeCard} ${!isDark ? styles.active : ''}`}
                    onClick={() => isDark && toggleTheme()}
                    style={{ backgroundColor: themes.light.colors.background2 }}
                >
                    <div className={styles.preview} style={{ backgroundColor: themes.light.colors.background }}>
                        <div className={styles.skeletonLine} style={{ backgroundColor: themes.light.colors.primary }}></div>
                        <div className={styles.skeletonLine} style={{ backgroundColor: themes.light.colors.bottom, width: '60%' }}></div>
                    </div>
                    <div className={styles.cardInfo}>
                        <div className={styles.labelGroup}>
                        <FaSun className={styles.themeIcon} color="#f59e0b" />
                        <span style={{ color: themes.light.colors.text }}>Modo Claro</span>
                        </div>
                        {!isDark && <FaCheckCircle className={styles.checkIcon} color={theme.colors.primary} />}
                    </div>
                </div>

                {/* Card Modo Escuro */}
                <div 
                    className={`${styles.themeCard} ${isDark ? styles.active : ''}`}
                    onClick={() => !isDark && toggleTheme()}
                    style={{ backgroundColor: themes.dark.colors.background2 }}
                >
                    <div className={styles.preview} style={{ backgroundColor: themes.dark.colors.background }}>
                        <div className={styles.skeletonLine} style={{ backgroundColor: themes.dark.colors.primary }}></div>
                        <div className={styles.skeletonLine} style={{ backgroundColor: themes.dark.colors.bottom, width: '60%' }}></div>
                    </div>
                    <div className={styles.cardInfo}>
                        <div className={styles.labelGroup}>
                        <FaMoon className={styles.themeIcon} color="#818cf8" />
                        <span style={{ color: themes.dark.colors.text }}>Modo Escuro</span>
                        </div>
                        {isDark && <FaCheckCircle className={styles.checkIcon} color={theme.colors.primary} />}
                    </div>
                </div>
            </div>
        </div>
    )
}