import styles from './styles.module.css';

interface CardProps {
    title: string;
    value: number;
    valueColor: string;
    info: string;
}

export function Card({title, value, valueColor, info}: CardProps) {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h3 className={styles.title}>
                    {title}
                </h3>
                <p className={styles.value} style={{color: valueColor}}>
                    R$ {value.toFixed(2)}
                </p>
                <span className={styles.info}>
                    {info}
                </span>
          </div>
        </div>
    )
}