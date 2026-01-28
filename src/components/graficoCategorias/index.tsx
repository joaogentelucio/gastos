import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import api from "@/services/api";
import styles from './styles.module.css';

interface GastoCategoria {
  name: string;
  value: number;
}

const COLORS = ['#4ade80', '#f87171', '#6366f1', '#fbbf24', '#a855f7'];

export function GraficoCategorias() {
  const [dados, setDados] = useState<GastoCategoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  
  // Estado para rastrear qual fatia está selecionada
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        setLoading(true);
        const response = await api.get<GastoCategoria[]>('/Despesas/gastos-por-categoria');
        setDados(response.data);
      } catch (err: unknown) {
        setErro(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };
    buscarDados();
  }, []);

  if (loading) return <div className={styles.loading}>Carregando...</div>;
  if (erro) return <div className={styles.error}>{erro}</div>;

  // Pega os dados da fatia ativa ou mostra o "Total" por padrão
  const itemAtivo = activeIndex !== null ? dados[activeIndex] : { name: "Total", value: 100 };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Gastos por Categoria</h3>
      
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* O texto agora é dinâmico com base no mouse/clique */}
          <text x="50%" y="45%" textAnchor="middle" dominantBaseline="middle" className={styles.centerTextTitle}>
            {itemAtivo.name}
          </text>
          <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" className={styles.centerTextValue}>
            {itemAtivo.value}%
          </text>

          <Pie
            data={dados}
            cx="50%"
            cy="50%"
            innerRadius={85}
            outerRadius={115}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
            // Corrigido: Removido 'name' não utilizado para sumir o erro 6133
            label={({ value }) => `${value}%`} 
            labelLine={false}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {dados.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                style={{ cursor: 'pointer', outline: 'none' }}
              />
            ))}
          </Pie>

          <Tooltip 
            formatter={(value: any) => [`${value}%`, 'Participação']}
            contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px', color: '#fff' }}
          />
          
          <Legend 
            verticalAlign="bottom" 
            align="center"
            iconType="circle"
            formatter={(value) => <span style={{ color: '#fff', fontSize: '14px', marginRight: '10px' }}>{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}