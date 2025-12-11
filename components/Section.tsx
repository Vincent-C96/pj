import React, { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ id, title, icon, children, className = "" }) => {
  return (
    <section id={id} className={`max-w-5xl mx-auto mb-12 scroll-mt-24 ${className}`}>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 flex items-center gap-3">
          {icon && <span className="text-white/90">{icon}</span>}
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">{title}</h2>
        </div>
        <div className="p-6 md:p-8">
          {children}
        </div>
      </div>
    </section>
  );
};