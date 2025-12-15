export type TransactionType = 'RECEITA' | 'DESPESA';

export interface Transaction {
  id: string;
  data: string;
  descricao: string;
  valor: number;
  tipo: TransactionType;
}

export interface Appointment {
  id: string;
  dataHora: string;
  descricao: string;
  cliente: string;
}

export interface DashboardData {
  saldoAtual: number;
  receitasMensais: number;
  despesasMensais: number;
  transacoesRecentes: Transaction[];
  proximosAgendamentos: Appointment[];
}