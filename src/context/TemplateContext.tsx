import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type TemplateType = 'modern' | 'classic' | 'minimal' | 'creative';

interface TemplateContextType {
  currentTemplate: TemplateType;
  setTemplate: (template: TemplateType) => void;
  templates: { id: TemplateType; name: string; preview: string }[];
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const TemplateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTemplate, setCurrentTemplate] = useState<TemplateType>('modern');

  const templates = [
    { id: 'modern' as const, name: 'Modern', preview: 'Clean and contemporary design' },
    { id: 'classic' as const, name: 'Classic', preview: 'Traditional professional layout' },
    { id: 'minimal' as const, name: 'Minimal', preview: 'Simple and elegant' },
    { id: 'creative' as const, name: 'Creative', preview: 'Unique and eye-catching' },
  ];

  const setTemplate = (template: TemplateType) => {
    setCurrentTemplate(template);
  };

  return (
    <TemplateContext.Provider value={{ currentTemplate, setTemplate, templates }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within TemplateProvider');
  }
  return context;
};
