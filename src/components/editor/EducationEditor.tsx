import React from "react";
import { useResume } from "../../context/ResumeContext";
import { FaGraduationCap, FaPlus, FaTrash } from "react-icons/fa";

const EducationEditor: React.FC = () => {
    const { resume, addEducation, updateEducation, removeEducation } = useResume();

    const handleAdd = () => {
        addEducation({
            institution: 'University Name',
            degree: 'Degree',
            field: 'Field of Study',
            graduationDate: '',
            gpa: '',
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                        <FaGraduationCap className="text-xl" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Education</h2>
                        <p className="text-sm text-gray-500">Add your educational background</p>
                    </div>
                </div>
                <button
                onClick={handleAdd}
                className="flex items-center gap-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all"
                >
                    <FaPlus />
                    Add Education
                </button>
            </div>

            <div className="space-y-4">
                {resume.education.map((edu) => (
                    <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between">
                            <div className="flex-1 space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Insitution</label>
                                        <input
                                        type="text"
                                        value={edu.institution}
                                        onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Degree</label>
                                        <input
                                        type="text"
                                        value={edu.degree}
                                        onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500">Field of Study</label>
                                        <input
                                        type="text"
                                        value={edu.field}
                                        onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Graduation Date</label>
                                        <input
                                        type="month"
                                        value={edu.graduationDate}
                                        onChange={(e) => updateEducation(edu.id, { graduationDate: e.target.value })}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">GPA (optional)</label>
                                        <input
                                        type="text"
                                        value={edu.gpa || ''}
                                        onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                                        placeholder="3.8"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                            onClick={() => removeEducation(edu.id)}
                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors ml-4"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}

                {resume.education.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <p className="text-lg mb-2">No education added yet</p>
                        <p className="text-sm">Click "Add Education" to start building your resume</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EducationEditor;
