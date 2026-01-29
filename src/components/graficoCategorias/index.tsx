import { useEffect, useState } from "react";
import api from "@/services/api";
import styles from "./styles.module.css";

interface GastoCategoria {
  name: string;
  value: number;
}

const COLORS = ["#4ade80", "#f87171", "#6366f1", "#fbbf24", "#a855f7"];

const polarToCartesian = (
  cx: number,
  cy: number,
  r: number,
  angle: number
) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

const createArc = (
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngle: number,
  endAngle: number
) => {
  const startOuter = polarToCartesian(cx, cy, outerR, endAngle);
  const endOuter = polarToCartesian(cx, cy, outerR, startAngle);
  const startInner = polarToCartesian(cx, cy, innerR, endAngle);
  const endInner = polarToCartesian(cx, cy, innerR, startAngle);

  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return `
    M ${startOuter.x} ${startOuter.y}
    A ${outerR} ${outerR} 0 ${largeArc} 0 ${endOuter.x} ${endOuter.y}
    L ${endInner.x} ${endInner.y}
    A ${innerR} ${innerR} 0 ${largeArc} 1 ${startInner.x} ${startInner.y}
    Z
  `;
};

export function GraficoCategorias() {
  const [dados, setDados] = useState<GastoCategoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    api
      .get<GastoCategoria[]>("/Despesas/gastos-por-categoria")
      .then((res) => setDados(res.data))
      .catch((err) => setErro(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.loading}>Carregando...</div>;
  if (erro) return <div className={styles.error}>{erro}</div>;

  const total = dados.reduce((sum, d) => sum + d.value, 0);
  let startAngle = 0;

  const ativo =
    activeIndex !== null
      ? dados[activeIndex]
      : { name: "Total", value: total };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Gastos por Categoria</h3>

      <svg width="280" height="280" viewBox="0 0 280 280">
        <g>
          {dados.map((item, index) => {
            const angle = (item.value / total) * 360;
            const endAngle = startAngle + angle;

            const path = createArc(
              140,
              140,
              70,
              activeIndex === index ? 105 : 95,
              startAngle,
              endAngle
            );

            startAngle = endAngle;

            return (
              <path
                key={item.name}
                d={path}
                fill={COLORS[index % COLORS.length]}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              />
            );
          })}
        </g>

        {/* Texto central */}
        <text
          x="140"
          y="130"
          textAnchor="middle"
          className={styles.centerTextTitle}
        >
          {ativo.name}
        </text>
        <text
          x="140"
          y="155"
          textAnchor="middle"
          className={styles.centerTextValue}
        >
          {ativo.value}%
        </text>
      </svg>
    </div>
  );
}
