import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Sector } from 'recharts';
import api from "@/services/api";
import styles from './styles.module.css';

interface GastoCategoria {
  name: string;
  value: number;
}

const COLORS = ['#6366f1', '#f43f5e', '#10b981', '#fbbf24', '#8b5cf6'];

export function GraficoCategorias() {
  const [dados, setDados] = useState<GastoCategoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

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

  if (loading) return <div className={styles.loading}>Carregando dados financeiros...</div>;
  if (erro) return <div className={styles.error}>{erro}</div>;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Gastos por Categoria</h3>
      
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
            itemStyle={{ color: '#f8fafc' }}
            formatter={(value: any) => [`${value}%`, 'Peso']}
          />
          
          <Pie
            {...({
              data: dados,
              cx: "50%",
              cy: "50%",
              innerRadius: 70,
              outerRadius: 90,
              paddingAngle: 8,
              dataKey: "value",
              stroke: "none",
              onMouseEnter: (_: any, index: number) => setActiveIndex(index),
              onMouseLeave: () => setActiveIndex(-1),
              activeIndex: activeIndex,
              activeShape: (props: any) => {
                const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
                return (
                  <g>
                    <text x={cx} y={cy} dy={8} textAnchor="middle" className={styles.centerText}>
                      {payload.value}%
                    </text>
                    <Sector
                      cx={cx} cy={cy}
                      innerRadius={innerRadius}
                      outerRadius={outerRadius + 6}
                      startAngle={startAngle}
                      endAngle={endAngle}
                      fill={fill}
                    />
                  </g>
                );
              }
            } as any)}
          >
            {dados.map((_, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                style={{ filter: `drop-shadow(0px 0px 4px ${COLORS[index % COLORS.length]}88)` }}
              />
            ))}
          </Pie>

          <Legend 
            verticalAlign="bottom" 
            align="center"
            iconType="circle"
            wrapperStyle={{ color: '#cbd5e1' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}