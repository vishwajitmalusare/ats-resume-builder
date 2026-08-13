import React from 'react';
import { useTemplate } from '../../context/TemplateContext';
import { ExportService } from '../../services/exportService';
import { useResume } from '../../context/ResumeContext';
import { FaFilePdf, FaFileWord, FaRobot } from 'react-icons/fa';

const Header: React.FC = () => {
  const { currentTemplate, setTemplate, templates } = useTemplate();
  const { resume } = useResume();
  const exportService = new ExportService();

  const handleExportPDF = async () => {
    const element = document.getElementById('resume-preview');
    if (element) {
      await exportService.exportAsPDF(element);
    }
    };

    const handleExportDOCX = () => {
    exportService.exportAsDOCX(resume);
  }

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                        <FaFileWord className="text-white text-xl" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">ATS Resume Builder</h1>
                        <p className="text-xs text-gray-500">Create ATS-optimized resumes</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                        {templates.map((template) => (
                            <button
                                key={template.id}
                                onClick={() => setTemplate(template.id)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                                    currentTemplate === template.id
                                        ? 'bg-white text-primary-600 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                {template.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleExportPDF}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all hover:shadow-lg"
                    >
                        <FaFilePdf />
                        PDF
                    </button>
                    <button
                        onClick={handleExportDOCX}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all hover:shadow-lg"
                    >
                        <FaFileWord />
                        DOCX
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all hover:shadow-lg">
                        <FaRobot />
                        ATS Score
                    </button>
                </div>
                </div>
            </div>
            </header>
  );
};

export default Header;
