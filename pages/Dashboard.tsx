import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/api';
import { DashboardData } from '../types';
import { ArrowUp, ArrowDown, DollarSign, Calendar as CalendarIcon, MoreHorizontal, TrendingUp } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Dados simulados para o gráfico (placeholders)
const chartData = [
  { name: 'Jan', receita: 4000, despesa: 2400 },
  { name: 'Fev', receita: 3000, despesa: 1398 },
  { name: 'Mar', receita: 2000, despesa: 9800 },
  { name: 'Abr', receita: 2780, despesa: 3908 },
  { name: 'Mai', receita: 1890, despesa: 4800 },
  { name: 'Jun', receita: 2390, despesa: 3800 },
  { name: 'Jul', receita: 3490, despesa: 4300 },
];

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(date);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { 
        day: '2-digit', 
        month: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Visão Geral</h1>
          <p className="text-gray-500 mt-1">Bem-vindo de volta ao AgendAI.</p>
        </div>
        <button className="bg-primary text-white px-5 py-2 rounded-lg font-medium hover:bg-opacity-90 transition shadow-sm">
          Nova Transação
        </button>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Saldo */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
              <TrendingUp size={12} /> +12%
            </span>
          </div>
          <p className="text-gray-500 text-sm font-medium">Saldo Atual</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{formatCurrency(data.saldoAtual)}</h3>
        </div>

        {/* Card Receitas */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <ArrowUp className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm font-medium">Receitas Mensais</p>
          <h3 className="text-3xl font-bold text-emerald-600 mt-1">{formatCurrency(data.receitasMensais)}</h3>
        </div>

        {/* Card Despesas */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-rose-50 rounded-lg">
              <ArrowDown className="w-6 h-6 text-rose-600" />
            </div>
          </div>
          <p className="text-gray-500 text-sm font-medium">Despesas Mensais</p>
          <h3 className="text-3xl font-bold text-rose-600 mt-1">{formatCurrency(data.despesasMensais)}</h3>
        </div>
      </div>

      {/* Seção Principal: Gráfico e Agendamentos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Gráfico de Tendência */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Fluxo de Caixa</h2>
            <select className="bg-gray-50 border border-gray-200 text-gray-600 text-sm rounded-lg p-2 outline-none">
              <option>Últimos 6 meses</option>
              <option>Este ano</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A3D62" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0A3D62" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#374151', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="receita" stroke="#0A3D62" strokeWidth={2} fillOpacity={1} fill="url(#colorReceita)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Próximos Agendamentos */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800">Próximos Agendamentos</h2>
            <button className="text-primary text-sm font-medium hover:underline">Ver todos</button>
          </div>
          
          <div className="flex-1 space-y-4">
            {data.proximosAgendamentos.map((item) => (
              <div key={item.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="bg-indigo-50 text-indigo-600 p-3 rounded-lg group-hover:bg-indigo-100 transition-colors">
                  <CalendarIcon size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">{item.descricao}</h4>
                  <p className="text-gray-500 text-xs mt-1">{item.cliente}</p>
                </div>
                <div className="text-right">
                   <span className="text-xs font-medium text-gray-400 block">{formatDateTime(item.dataHora).split(' ')[0]}</span>
                   <span className="text-xs font-bold text-primary block mt-1">{formatDateTime(item.dataHora).split(' ')[1]}</span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 py-2 border border-dashed border-gray-300 rounded-lg text-gray-500 text-sm hover:border-primary hover:text-primary transition-colors">
            + Novo Agendamento
          </button>
        </div>
      </div>

      {/* Transações Recentes */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
           <h2 className="text-lg font-bold text-gray-800">Transações Recentes</h2>
           <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
             <MoreHorizontal size={20} />
           </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Descrição</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.transacoesRecentes.map((transacao) => (
                <tr key={transacao.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{transacao.descricao}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {formatDate(transacao.data)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      transacao.tipo === 'RECEITA' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {transacao.tipo === 'RECEITA' ? 'Recebido' : 'Pago'}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-right font-semibold text-sm ${
                    transacao.tipo === 'RECEITA' ? 'text-emerald-600' : 'text-gray-900'
                  }`}>
                    {transacao.tipo === 'DESPESA' ? '-' : '+'} {formatCurrency(transacao.valor)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;