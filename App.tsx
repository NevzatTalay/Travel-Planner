
import React from 'react';
import { useAuth } from './hooks/useAuth';
import DashboardPage from './components/pages/DashboardPage';
import AuthPage from './components/pages/AuthPage';

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900 font-sans">
      <div className="w-full max-w-md">
        {user ? <DashboardPage /> : <AuthPage />}
      </div>
    </div>
  );
};

export default App;
