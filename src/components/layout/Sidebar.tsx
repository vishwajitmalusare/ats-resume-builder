import React from 'react';
import { useResume } from '../../context/ResumeContext';
import type { ResumeSectionKey } from '../../types/resume.types';
import {
  FaUser,
  FaAlignLeft,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaProjectDiagram,
  FaCertificate,
  FaRobot,
} from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const { activeSection, setActiveSection } = useResume();

  const sections: { id: ResumeSectionKey; label: string; icon: React.ReactNode }[] = [
    { id: 'personal', label: 'Personal Info', icon: <FaUser /> },
    { id: 'summary', label: 'Summary', icon: <FaAlignLeft /> },
    { id: 'experience', label: 'Experience', icon: <FaBriefcase /> },
    { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
    { id: 'skills', label: 'Skills', icon: <FaCode /> },
    { id: 'projects', label: 'Projects', icon: <FaProjectDiagram /> },
    { id: 'certifications', label: 'Certifications', icon: <FaCertificate /> },
    { id: 'ats', label: 'ATS Analysis', icon: <FaRobot /> },
  ];

  return (
    <div className="bg-white rounded-xl shadow-card p-3 lg:p-4 lg:sticky lg:top-24 lg:h-[calc(100vh-140px)] flex flex-col">
      <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex-shrink-0 flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg text-xs lg:text-sm font-medium transition-all ${
              activeSection === section.id
                ? 'bg-primary-50 text-primary-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className={`text-base lg:text-lg ${activeSection === section.id ? 'text-primary-600' : ''}`}>
              {section.icon}
            </span>
            <span>{section.label}</span>
            {activeSection === section.id && (
              <span className="hidden lg:block ml-auto w-1.5 h-8 bg-primary-600 rounded-full" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
