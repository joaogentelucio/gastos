export interface Despesa {
  id: number;
  nome: string;
  valorTotal: number;
  tipoDespesa: 'fixa' | 'adicional';
  tipoTransacao: 'credito' | 'debito';
  parcelasTotais?: number;            
  dataPrimeiraParcela?: string;       
  dataDespesa: string;                
  categoriaId?: number;               
  formaPagamentoId?: number;          
  fkIdUsuario: number;                
  criadoEm: string;                   
  atualizadoEm?: string;              
}
