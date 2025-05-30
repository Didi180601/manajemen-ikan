import React from "react";

// Input Component
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-blue-900">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-3 py-2 border rounded-lg transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-200
          ${error 
            ? 'border-red-300 focus:border-red-500' 
            : 'border-blue-200 focus:border-blue-500'
          }
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
