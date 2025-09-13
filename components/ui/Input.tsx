
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ className, type, label, id, ...props }) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <label htmlFor={id} className="text-sm font-medium leading-none text-slate-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`
          flex h-10 w-full rounded-md border border-slate-700 bg-slate-800
          px-3 py-2 text-sm text-slate-50 ring-offset-slate-900 file:border-0
          file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500
          focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
          transition-colors
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

export default Input;
