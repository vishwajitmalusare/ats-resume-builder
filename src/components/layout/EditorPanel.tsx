import React from 'react';
import { useResume } from '../../context/ResumeContext';
import PersonalInfoEditor from '../editor/PersonalInfoEditor';
import SummaryEditor from '../editor/SummaryEditor';
import ExperienceEditor from '../editor/ExperienceEditor';
import EducationEditor from '../editor/EducationEditor';
import SkillsEditor from '../editor/SkillsEditor';
import ProjectsEditor from '../editor/ProjectEditor';
import CertificationsEditor from '../editor/CertificationEditor';
import ATSScore from '../ats/ATSScore';

const EditorPanel: React.FC = () => {
  const { activeSection } = useResume();

    const renderEditor = () => {
        switch (activeSection) {
            case 'personal':
                return <PersonalInfoEditor />;
            case 'summary':
                return <SummaryEditor />;
            case 'experience':
                return <ExperienceEditor />;
            case 'education':
                return <EducationEditor />;
            case 'skills':
                return <SkillsEditor />;
            case 'projects':
                return <ProjectsEditor />;
            case 'certifications':
                return <CertificationsEditor />;
            case 'ats':
                return <ATSScore />;
            default:
                return <PersonalInfoEditor />
        }
    };

    return (
    <div className="bg-white rounded-xl shadow-card p-6 h-[calc(100vh-140px)] overflow-y-auto">
        {renderEditor()}
    </div>
    );
};

export default EditorPanel;
