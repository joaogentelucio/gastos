import { FaCreditCard, FaCalendarAlt, FaTag } from 'react-icons/fa';
import styles from './styles.module.css';
import { Despesa } from '@/types/despesas-types';

interface DespesaListProps {
  despesas: Despesa[];
}

export default function DespesaList({ despesas }: DespesaListProps) {

  const formatarData = (dataStr: string | undefined) => {
    if (!dataStr) return 'Data não informada';
    const data = new Date(dataStr.includes('T') ? dataStr : `${dataStr}T00:00:00`);
    return data.toLocaleDateString('pt-BR');
  };

  if (!despesas.length) {
    return <p>Nenhuma despesa cadastrada.</p>;
  }

  return (
    <div className={styles.container}>
      {despesas.map((d, index) => (
        <div key={d.Id ?? `${d.Nome}-${index}`} className={styles.card}>
          <div className={styles.cardHeader}>
            <h4>{d.Nome}</h4>
            <span className={styles.badge}>{d.TipoDespesa}</span>
          </div>

          <div className={styles.cardBody}>
            <div className={styles.priceRow}>
              <span className={styles.label}>Valor Total</span>
              <span className={styles.value}>R$ {(d.ValorTotal ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>

            {d.TipoTransacao === 'CREDITO' && (
              <div className={styles.parcelasBox}>
                <FaCreditCard size={14} />
                <span>{d.ParcelasTotais}x parcelas (Início: {formatarData(d.DataPrimeiraParcela)})</span>
              </div>
            )}

            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <FaTag size={12} />
                <span>{d.TipoTransacao}</span>
              </div>
              <div className={styles.infoItem}>
                <FaCalendarAlt size={12} />
                <span>{formatarData(d.DataDespesa)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
