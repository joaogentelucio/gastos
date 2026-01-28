import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import api from "@/services/api";

interface GastoCategoria {
  name: string;
  value: number;
}

const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#8884d8'];

export function GraficoCategorias() {
  const [dados, setDados] = useState<GastoCategoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        setLoading(true);
        
        const response = await api.get<GastoCategoria[]>('/Despesas/gastos-por-categoria');

        setDados(response.data);
        
      } catch (err: unknown) {
    
        if (err instanceof Error) {
          setErro(err.message);
        } else {
          setErro("Um erro desconhecido ocorreu.");
        }
      } finally {
        setLoading(false);
      }
    };

    buscarDados();
  }, []);

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', padding: '20px' }}>Carregando gráfico...</div>;
  if (erro) return <div style={{ color: '#ff4d4d', textAlign: 'center', padding: '20px' }}>{erro}</div>;

  return (
    <div style={{ width: '100%', height: 300, backgroundColor: '#1e1e1e', borderRadius: '8px', padding: '10px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dados}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value" 
            nameKey="name"
          >
            {dados.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: any) => [`${value}%`, 'Porcentagem']}
            contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '5px' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            wrapperStyle={{ color: '#fff', paddingTop: '10px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}