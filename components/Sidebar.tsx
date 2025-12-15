import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wallet, Calendar, PieChart, Settings, LogOut } from 'lucide-react';

const Sidebar: React.FC = () => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-primary text-white shadow-md'
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <aside className="w-64 h-screen bg-gray-50 border-r border-gray-200 flex flex-col fixed left-0 top-0">
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
          <PieChart className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-bold text-gray-800 tracking-tight">AgendAI</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        <NavLink to="/" className={linkClasses}>
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </NavLink>
        <NavLink to="/financas" className={linkClasses}>
          <Wallet size={20} />
          <span className="font-medium">Finanças</span>
        </NavLink>
        <NavLink to="/agendamentos" className={linkClasses}>
          <Calendar size={20} />
          <span className="font-medium">Agendamentos</span>
        </NavLink>
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-2">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Settings size={20} />
          <span className="font-medium">Configurações</span>
        </button>
        <button className="flex items-center gap-3 px-4 py-3 w-full text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;