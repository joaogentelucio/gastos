import { useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import styles from '@/styles/Dashboard.module.css';
import { useTheme } from '@/context/ThemeContext';
import api from '@/services/api';
import type { Despesa } from '@/types/despesas-types';
import { GraficoCategorias } from '@/components/graficoCategorias';

type MonthRow = { key: string; label: string; total: number; count: number; date: Date };
const money = (amount: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
const keyFor = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
const labelFor = (date: Date) => date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
const validDate = (value: string) => {
  // Interpret ISO date-only values as local dates, avoiding UTC day shifts.
  const match = value?.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
};

export default function Dashboard() {
  const { theme } = useTheme();
  const [expenses, setExpenses] = useState<Despesa[]>([]);
  const [forecast, setForecast] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(() => keyFor(new Date()));

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const [list, next] = await Promise.all([
          api.get<Despesa[] | { Dados?: Despesa[] }>('/Despesas/ListarDespesas'),
          api.get<{ PrevisaoMesSeguinte: number }>('/Despesas/previsao-proximo-mes')
        ]);
        if (!active) return;
        const rows = Array.isArray(list.data) ? list.data : (list.data.Dados ?? []);
        setExpenses(rows);
        setForecast(Number(next.data.PrevisaoMesSeguinte ?? 0));
      } catch (err) {
        console.error('Erro ao carregar dashboard:', err);
        if (active) setError('Não foi possível carregar o painel. Verifique sua conexão e tente novamente.');
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => { active = false; };
  }, []);

  const months = useMemo(() => {
    const today = new Date();
    const first = new Date(today.getFullYear(), today.getMonth(), 1);
    const earliest = expenses.reduce<Date | null>((value, expense) => {
      const date = validDate(expense.DataDespesa);
      return date && (!value || date < value) ? date : value;
    }, null);
    const totalMonths = earliest
      ? Math.min(120, Math.max(12, (first.getFullYear() - earliest.getFullYear()) * 12 + first.getMonth() - earliest.getMonth() + 1))
      : 12;
    const totals = new Map<string, { total: number; count: number }>();
    expenses.forEach(expense => {
      const date = validDate(expense.DataDespesa);
      if (!date) return;
      const key = keyFor(date);
      const old = totals.get(key) ?? { total: 0, count: 0 };
      totals.set(key, { total: old.total + Number(expense.ValorTotal || 0), count: old.count + 1 });
    });
    return Array.from({ length: totalMonths }, (_, index): MonthRow => {
      const date = new Date(first.getFullYear(), first.getMonth() - index, 1);
      const key = keyFor(date);
      return { key, date, label: labelFor(date), ...(totals.get(key) ?? { total: 0, count: 0 }) };
    });
  }, [expenses]);

  const selected = months.find(row => row.key === selectedMonth) ?? months[0];
  const selectedIndex = Math.max(0, months.findIndex(row => row.key === selected.key));
  const chartRows = months.slice(selectedIndex, selectedIndex + 6).reverse().map(row => ({
    month: row.date.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', ''),
    Despesas: row.total
  }));
  const currentKey = keyFor(new Date());
  const isCurrent = selected.key === currentKey;

  return (
    <div className={styles.container} style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}>
      <main className={styles.mainContent}>
        <header className={styles.heading}>
          <div>
            <h1>Visão geral financeira</h1>
            <p>Despesas reais e histórico mensal de suas movimentações.</p>
          </div>
          <label className={styles.monthPicker}>
            <span>Mês de referência</span>
            <select aria-label="Mês de referência" value={selected.key} onChange={event => setSelectedMonth(event.target.value)}>
              {months.map(row => <option key={row.key} value={row.key}>{row.label}</option>)}
            </select>
          </label>
        </header>
        {error && <div role="alert" className={styles.error}>{error} <button onClick={() => window.location.reload()}>Tentar novamente</button></div>}
        <section className={styles.kpiContainer} aria-label="Indicadores financeiros">
          <article className={styles.kpi}><span>Receitas do mês</span><strong className={styles.mutedValue}>—</strong><small>Receitas ainda não cadastradas no sistema</small></article>
          <article className={styles.kpi}><span>Despesas do mês</span><strong>{loading ? 'Carregando...' : money(selected.total)}</strong><small>{selected.count} {selected.count === 1 ? 'lançamento' : 'lançamentos'} em {selected.label}</small></article>
          <article className={styles.kpi}><span>Saldo disponível</span><strong className={styles.mutedValue}>—</strong><small>Disponível após implementar receitas</small></article>
          <article className={styles.kpi}><span>{isCurrent ? 'Próximo mês' : 'Previsão para o próximo mês'}</span><strong>{loading ? 'Carregando...' : isCurrent && forecast !== null ? money(forecast) : '—'}</strong><small>{isCurrent ? 'Estimativa atual da API' : 'Previsões históricas não disponíveis'}</small></article>
        </section>
        <section className={styles.panel}>
          <div className={styles.panelHead}><div><h2>Fluxo de caixa mensal</h2><p>Histórico de despesas dos últimos 6 meses até o período selecionado</p></div></div>
          <div className={styles.chartArea}>
            {!loading && chartRows.some(row => row.Despesas > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartRows} margin={{ top: 10, right: 10, left: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 5" vertical={false} stroke={theme.colors.grey21} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} stroke={theme.colors.text} />
                  <YAxis tickLine={false} axisLine={false} stroke={theme.colors.text} width={75} tickFormatter={value => new Intl.NumberFormat('pt-BR', { notation: 'compact' }).format(value)} />
                  <Tooltip cursor={false} formatter={value => money(Number(value ?? 0))} contentStyle={{ background: theme.colors.background2, borderColor: theme.colors.grey21, borderRadius: 12, color: theme.colors.text }} />
                  <Bar dataKey="Despesas" fill="#388747" radius={[8, 8, 0, 0]} maxBarSize={56} />
                </BarChart>
              </ResponsiveContainer>
            ) : <div className={styles.empty}>{loading ? 'Carregando histórico...' : 'Nenhuma despesa encontrada neste período.'}</div>}
          </div>
          <p className={styles.note}>As receitas e o saldo serão exibidos quando houver cadastro de receitas. Nenhum valor é estimado como receita.</p>
        </section>
        <section className={styles.panel}>
          <div className={styles.panelHead}><div><h2>Histórico de meses anteriores</h2><p>Selecione um mês para consultar o total e atualizar o gráfico.</p></div></div>
          <div className={styles.historyList}>
            {months.filter(row => row.key < currentKey).map(row => (
              <button className={`${styles.historyRow} ${row.key === selected.key ? styles.historyActive : ''}`} key={row.key} onClick={() => setSelectedMonth(row.key)} aria-pressed={row.key === selected.key}>
                <span className={styles.historyMonth}>{row.label}</span>
                <span className={styles.historyCount}>{row.count} {row.count === 1 ? 'despesa' : 'despesas'}</span>
                <strong>{money(row.total)}</strong>
              </button>
            ))}
          </div>
        </section>
        {isCurrent && <section className={styles.categories}><GraficoCategorias /></section>}
      </main>
    </div>
  );
}
