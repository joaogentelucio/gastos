import styles from './styles.module.css';
import { useTheme } from '@/context/ThemeContext';

interface CardProps {
    title: string;
    value: string | number;
    valueColor: string;
    info: string;
}

export function Card({title, value, valueColor, info}: CardProps) {
    const { theme } = useTheme();

    return (
        <div className={styles.container}>
            <div className={styles.card} style={{ backgroundColor: theme.colors.bottom }}>
                <h3 className={styles.title}>
                    {title}
                </h3>
                <p className={styles.value} style={{color: valueColor}}>
                    R$ {value}
                </p>
                <span className={styles.info}>
                    {info}
                </span>
          </div>
        </div>
    )
}