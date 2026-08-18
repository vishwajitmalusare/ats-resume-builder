import React, { useState } from "react";
import { useResume } from "../../context/ResumeContext";
import { FaCode, FaPlus, FaTrash } from "react-icons/fa";

const SkillsEditor: React.FC = () => {
    const { resume, addSkill, removeSkill } = useResume();
    const [newSkill, setNewSkill] = useState('');
    const [category, setCategory] = useState<'technical' | 'soft' | 'language'>('technical');

    const handleAdd = () => {
        if (newSkill.trim()) {
            addSkill({
                name: newSkill.trim(),
                category,
            });
            setNewSkill('');
        }
    };

      const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

    const technicalSkills = resume.skills.filter(s => s.category === 'technical');
     const softSkills = resume.skills.filter(s => s.category === 'soft');
  const languageSkills = resume.skills.filter(s => s.category === 'language');

  return (
    <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
            <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                <FaCode className="text-xl" />
            </div>
            <div>
                <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
                <p className="text-sm text-gray-500">Add your technical, soft, and laguage skills</p>
            </div>
        </div>

        <div className="flex gap-3">
            <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a skill..."
            className="flex-1 input-field"
            />
            <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            >
                  <option value="technical">Technical</option>
                  <option value="soft">Soft</option>
                  <option value="language">Language</option>
            </select>
            <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all"
            >
                <FaPlus />
                Add
            </button>
        </div>
        
        <div className="space-y-4">
            {technicalSkills?.length > 0 && (
                <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Technical Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {technicalSkills.map((skill) => (
                            <span
                                key={skill.id}
                                className="flex items-center gap-2 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm"
                            >
                                {skill.name}
                                <button
                                onClick={() => removeSkill(skill.id)}
                                className="hover:text-red-600 transition-colors"
                                >
                                    <FaTrash className="text-xs" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {softSkills.length > 0 && (
                <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Soft Skills</h3>
                    <div className="flex flex-wrap gap-2">
                    {softSkills.map((skill) => (
                        <span
                        key={skill.id}
                            className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm"
                        >
                            {skill.name}
                            <button
                            onClick={() => removeSkill(skill.id)}
                            className="hover:text-red-600 transition-colors"
                            >
                                <FaTrash  className="text-xs"/>
                            </button>
                        </span>
                    ))}
                    </div>
                </div>
            )}

            {languageSkills.length > 0 && (
                <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Language Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {languageSkills.map((skill) => (
                            <span
                            key={skill.id}
                            className="flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm"
                            >
                                {skill.name}
                                <button
                                onClick={() =>  removeSkill(skill.id)}
                                className="hover:text-red-600 transition-colors"
                                >
                                    <FaTrash className="text-xs" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {resume.skills.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <p>No skills added yet. Start adding your skills above!</p>
                </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">💡 Pro Tip</h4>
                <p className="text-sm text-blue-700">
                    Include a mix of technical, soft, and laguage skills. Aim for 8-15 skills total for the best ATS results.
                </p>
            </div>
        </div>
    </div>
  );
};

export default SkillsEditor;
