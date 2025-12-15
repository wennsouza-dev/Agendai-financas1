import { DashboardData } from '../types';

export const fetchData = async (): Promise<DashboardData> => {
  // Simulação de delay de rede
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    saldoAtual: 15450.00,
    receitasMensais: 24500.00,
    despesasMensais: 9050.00,
    transacoesRecentes: [
      {
        id: '1',
        data: '2023-10-25',
        descricao: 'Consultoria Tech Start',
        valor: 4500.00,
        tipo: 'RECEITA'
      },
      {
        id: '2',
        data: '2023-10-24',
        descricao: 'Licença Software CRM',
        valor: 250.00,
        tipo: 'DESPESA'
      },
      {
        id: '3',
        data: '2023-10-23',
        descricao: 'Pagamento Freelancer Design',
        valor: 1200.00,
        tipo: 'DESPESA'
      }
    ],
    proximosAgendamentos: [
      {
        id: '101',
        dataHora: '2023-10-27T14:00:00',
        descricao: 'Reunião de Planejamento',
        cliente: 'Startup A'
      },
      {
        id: '102',
        dataHora: '2023-10-27T16:30:00',
        descricao: 'Mentoria Financeira',
        cliente: 'Empresa B'
      },
      {
        id: '103',
        dataHora: '2023-10-28T10:00:00',
        descricao: 'Apresentação de Resultados',
        cliente: 'Grupo Invest'
      }
    ]
  };
};