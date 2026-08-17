import React, { useState } from "react";
import { useResume } from "../../context/ResumeContext";
import { FaProjectDiagram, FaPlus, FaTrash } from "react-icons/fa";

const ProjectEditor: React.FC = () => {
    const { resume, addProject, updateProject, removeProject } = useResume();

    const handleAdd = () => {
        addProject({
            name: 'New Project',
            description: 'Project Description',
            techStack: [],
            link: ''
        });
    };

    const handleAddTech = (id: string, tech: string) => {
        const project = resume.projects.find(p => p.id === id);
        if (project && tech.trim()) {
            updateProject(id, {
                techStack: [...project.techStack, tech.trim()],
            });
        }
    };

    const handleRemoveTech = (id: string, index: number) => {
        const project = resume.projects.find(p => p.id === id);
        if (project) {
            const newTechStack = project.techStack.filter((_, i) => i !== index);
            updateProject(id, { techStack: newTechStack });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                        <FaProjectDiagram className="text-xl" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
                        <p className="text-sm text-gray-500">Add your personal or professional projects</p>
                    </div>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all"
                >
                    <FaPlus />
                    Add Project
                </button>
            </div>

            <div className="space-y-4">
                {resume.projects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between">
                            <div className="flex-1 space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Project Name</label>
                                        <input
                                            type="text"
                                            value={project.name}
                                            onChange={(e) => updateProject(project.id, { name: e.target.value })}
                                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-500 mb-1">Link (optional)</label>
                                        <input
                                            type="text"
                                            value={project.link || ''}
                                            onChange={(e) => updateProject(project.id, { link: e.target.value })}
                                            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                                            placeholder="github.com/project"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                                    <textarea
                                        value={project.description}
                                        onChange={(e) => updateProject(project.id, { description: e.target.value })}
                                        rows={2}
                                        className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Tech Stack</label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {project.techStack.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm"
                                            >{tech}
                                                <button
                                                    onClick={() => handleRemoveTech(project.id, idx)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <FaTrash className="text-xs" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Add technology..."
                                            className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                                            onKeyPress={(e) => {
                                                if (e.key === "Enter") {
                                                    const input = e.target as HTMLInputElement;
                                                    handleAddTech(project.id, input.value);
                                                    input.value = '';
                                                }
                                            }}
                                        />
                                        <button
                                            onClick={(e) => {
                                                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                                if (input) {
                                                    handleAddTech(project.id, input.value);
                                                    input.value = '';
                                                }
                                            }}
                                            className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                                        >
                                            <FaPlus className="text-sm" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => removeProject(project.id)}
                                className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors ml-4"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}

                {resume.projects.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <p className="text-lg mb-2">No project added yet</p>
                        <p className="text-sm">Click "Add Project" to showcase your work</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectEditor;
