import React, { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  children?: ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, children }) => {
  return (
    <div className="flex items-center mb-6">
      <h2 className="text-2xl font-bold mr-4">{title}</h2>
      {children}
    </div>
  );
};

export default SectionHeader;