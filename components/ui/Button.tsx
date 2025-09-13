
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center rounded-md text-sm font-medium
        ring-offset-slate-900 focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:pointer-events-none
        disabled:opacity-50 h-10 px-4 py-2 bg-sky-600 text-sky-50 hover:bg-sky-600/90
        transition-all duration-200 ease-in-out transform active:scale-95
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
