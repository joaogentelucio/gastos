import styles from './styles.module.css';
import { Despesa } from '@/types/despesas-types';

interface DespesaListProps {
  despesas: Despesa[];
}

export default function DespesaList({ despesas }: DespesaListProps) {
  if (!despesas.length) {
    return <p>Nenhuma despesa cadastrada.</p>;
  }

  return (
    <ul className={styles.list}>
      {despesas.map((d, index) => (
        <li key={d.Id ?? `${d.Nome}-${index}`} className={styles.card}>
          <h4>{d.Nome}</h4>

          <p>Valor: R$ {(d.ValorTotal ?? 0).toFixed(2)}</p>

          <p>
            Tipo: {d.TipoDespesa} / {d.TipoTransacao}
          </p>

          {d.TipoTransacao === 'CREDITO' && (
            <p>
              Parcelas: {d.ParcelasTotais} – 1ª Parcela: {d.DataPrimeiraParcela}
            </p>
          )}

          <p>Data da despesa: {d.DataDespesa}</p>
        </li>
      ))}
    </ul>
  );
}
