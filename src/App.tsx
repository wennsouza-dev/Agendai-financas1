import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Finances from './pages/Finances';
import Appointments from './pages/Appointments';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/financas" element={<Finances />} />
          <Route path="/agendamentos" element={<Appointments />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
