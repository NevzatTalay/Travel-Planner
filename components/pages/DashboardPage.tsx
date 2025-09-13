
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import Card from '../ui/Card';
import Button from '../ui/Button';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Card>
      <Card.Header>
        <Card.Title>Welcome Back!</Card.Title>
        <Card.Description>You are successfully logged in.</Card.Description>
      </Card.Header>
      <Card.Content className="text-center">
        <p className="text-lg text-slate-300 mb-6">
          Logged in as: <span className="font-semibold text-sky-400">{user?.email}</span>
        </p>
        <Button onClick={logout} className="w-full">
          Logout
        </Button>
      </Card.Content>
    </Card>
  );
};

export default DashboardPage;
