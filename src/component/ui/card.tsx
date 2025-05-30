import React from "react";

// Card Component
interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div className={`
      bg-white rounded-xl border border-blue-100 shadow-lg shadow-blue-100/50 p-6
      ${hover ? 'hover:shadow-xl hover:shadow-blue-100/70 transition-all duration-300' : ''}
      ${className}
    `}>
      {children}
    </div>
  )
}