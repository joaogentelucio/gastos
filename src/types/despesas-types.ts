export interface Despesa {
  Id: number;
  Nome: string;
  ValorTotal: number;
  DataDespesa: string;
  TipoDespesa: 'FIXA' | 'ADICIONAL';
  TipoTransacao: 'DEBITO' | 'CREDITO';
  ParcelasTotais: number;
  DataPrimeiraParcela: string;            
}

export interface CriarDespesaDTO {
  Nome: string;
  ValorTotal: number;
  TipoDespesa: 'FIXA' | 'ADICIONAL';
  TipoTransacao: 'DEBITO' | 'CREDITO';
  ParcelasTotais?: number;
  DataDespesa?: string;
  DataPrimeiraParcela?: string;
  CategoriaId: number;
  FormaPagamentoId: number;
}