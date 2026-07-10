import React from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`transition-transform duration-300 ${className}`}>
      {children}
    </div>
  );
};

export default TiltCard;
