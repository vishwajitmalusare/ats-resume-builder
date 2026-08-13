import React from "react";
import { useResume } from "../../context/ResumeContext";
import { FaBriefcase, FaPlus, FaTrash } from "react-icons/fa";

const ExperienceEditor: React.FC = () => {
    const { resume, addExperience, updateExperience, removeExperience } = useResume();

    const handleAdd = () => {
        addExperience({
            company: 'New Company',
            position: 'Position Title',
            startDate: '',
            endDate: '',
            current: false,
            description: ['Add responsibilty here']
        });
    };

    const handleUpdate = (id: string, field: string, value: any) => {
        updateExperience(id, { [field]: value });
    };

    const handleAddBullet = (id: string) => {
        const exp = resume.experience.find(e => e.id === id);
        if (exp) {
            updateExperience(id, {
                description: [...exp.description, 'New responsibiity'],
            });
        }
    };

    const handleUpdateBullet = (expId: string, index: number, value: string) => {
        const exp = resume.experience.find(e => e.id === expId);
        if (exp) {
            const newDescription = [...exp.description];
            newDescription[index] = value;
            updateExperience(expId, { description: newDescription });
        }
    };

    const handleRemoveBullet = (expId: string, index: number) => {
        const exp = resume.experience.find(e => e.id === expId);
        if (exp) {
            const newDescriptions = exp.description.filter((_, i) => i !== index);
            updateExperience(expId, { description: newDescriptions });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                        <FaBriefcase className="text-xl" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold test-gray-900">Work Experience</h2>
                        <p className="text-sm text-gray-500">Add your professional experience</p>
                    </div>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all">
                    <FaPlus />
                    Add Experience
                </button>
            </div>

            <div className="space-y-6">
                {resume.experience.map((exp) => (
                    <div key={exp.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex-1 space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Position</label>
                                        <input
                                            type="text"
                                            value={exp.position}
                                            onChange={(e) => handleUpdate(exp.id, 'position', e.target.value)}
                                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Company</label>
                                        <input
                                            type="text"
                                            value={exp.company}
                                            onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)}
                                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Start Date</label>
                                        <input
                                            type="month"
                                            value={exp.startDate}
                                            onChange={(e) => handleUpdate(exp.id, 'startDate', e.target.value)}
                                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">End Date</label>
                                        <input
                                            type="month"
                                            value={exp.endDate}
                                            onChange={(e) => handleUpdate(exp.id, 'endDate', e.target.value)}
                                            disabled={exp.current}
                                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                                        />
                                    </div>

                                    <div className="flex items-end">
                                        <label className="flex items-center gap-2 text-sm text-gray-700">
                                            <input
                                                type="checkbox"
                                                checked={exp.current}
                                                onChange={(e) => handleUpdate(exp.id, 'current', e.target.checked)}
                                                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                                            />
                                            Current
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Responsibilities</label>
                                    {exp.description.map((bullet, idx) => (
                                        <div key={idx} className="flex items-center gap-2 mb-2">
                                            <span className="text-primary-600 font-bold">•</span>
                                            <input
                                                type="text"
                                                value={bullet}
                                                onChange={(e) => handleUpdateBullet(exp.id, idx, e.target.value)}
                                                className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                                            />
                                            <button
                                                onClick={() => handleRemoveBullet(exp.id, idx)}
                                                className="text-red-500 hover:text-red-700 p-1">
                                                <FaTrash className="text-sm" />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => handleAddBullet(exp.id)}
                                        className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                                        + Add Responsibility
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => removeExperience(exp.id)}
                                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors ml-4">
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
                {resume.experience.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <p className="text-lg mb-2">No experience added yet</p>
                        <p className="text-sm">Click "Add Experience" to start building your resume</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExperienceEditor;
