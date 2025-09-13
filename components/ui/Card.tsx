
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> & {
  Header: React.FC<CardProps>;
  Title: React.FC<CardProps>;
  Description: React.FC<CardProps>;
  Content: React.FC<CardProps>;
  Footer: React.FC<CardProps>;
} = ({ children, className }) => {
  return (
    <div className={`rounded-xl border border-slate-700 bg-slate-800/50 shadow-lg backdrop-blur-sm ${className}`}>
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardProps> = ({ children, className }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardTitle: React.FC<CardProps> = ({ children, className }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight text-slate-50 ${className}`}>{children}</h3>
);

const CardDescription: React.FC<CardProps> = ({ children, className }) => (
  <p className={`text-sm text-slate-400 ${className}`}>{children}</p>
);

const CardContent: React.FC<CardProps> = ({ children, className }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const CardFooter: React.FC<CardProps> = ({ children, className }) => (
  <div className={`flex items-center justify-center p-6 pt-0 text-slate-400 ${className}`}>{children}</div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
