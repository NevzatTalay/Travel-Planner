
import React, { useState } from 'react';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return isLogin ? (
    <LoginForm onToggleForm={toggleForm} />
  ) : (
    <RegisterForm onToggleForm={toggleForm} />
  );
};

export default AuthPage;
