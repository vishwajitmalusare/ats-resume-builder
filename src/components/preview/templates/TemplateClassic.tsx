import React from "react";
import type { ResumeData } from "../../../types/resume.types";

interface TemplateProps {
    resume: ResumeData;
}

const TemplateClassic: React.FC<TemplateProps> = ({ resume }) => {
    const { personal, summary, experience, education, skills, certifications } = resume;

    return (
        <div className="p-8 max-w-[800px] mx-auto">
            <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
                <h1 className="text-3xl font-bold text-gray-900">
                    {personal.firstName} {personal.lastName}
                </h1>
                <p className="text-lg text-gray-600 mt-1">{personal.title}</p>
                <div className="flex justify-center gap-4 mt-2 text-sm text-gray-600">
                    <span>{personal.email}</span>
                    <span>•</span>
                    <span>{personal.phone}</span>
                    <span>•</span>
                    <span>{personal.location}</span>
                </div>
            </div>

            {summary && (
                <section className="mb-6">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">Professional Summary</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
                </section>
            )}

            {experience.length > 0 && (
                <section className="mb-6">
                    <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">
                        Work Expericence
                    </h3>
                    {experience.map((exp) => (
                        <div key={exp.id} className="mb-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-sm text-gray-800">{exp.position}</h4>
                                    <p className="text-sm text-gray-600">{exp.company}</p>
                                </div>
                                <span className="text-xs text-gray-500 whitespace-nowrap">
                                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                </span>
                            </div>
                            <ul className="mt-1 space-y-0.5">
                                {exp.description.map((bullet, idx) => (
                                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                        <span className="text-gray-400">•</span>
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </section>
            )}

            <div className="grid grid-cols-2 gap-6">
                <div>
                    {skills.length > 0 && (
                        <section className="mb-6">
                            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-1">
                                {skills.map((skill) => (
                                    <span key={skill.id} className="text-sm text-gray-700">
                                        {skill.name}
                                        {skill !== skills[skills.length - 1] && ' • '}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div>
                    {education.length > 0 && (
                        <section className="mb-6">
                            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">
                                Education
                            </h3>
                            {education.map((edu) => (
                                <div key={edu.id} className="mb-2">
                                    <h4 className="font-bold text-sm text-gray-800">{edu.degree}</h4>
                                    <p className="text-sm text-gray-600">{edu.institution}</p>
                                    <p className="text-sm text-gray-500">{edu.graduationDate}</p>
                                </div>
                            ))}
                        </section>
                    )}
                    {certifications.length > 0 && (
                        <section>
                            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">
                                Certifications
                            </h3>
                            {certifications.map((cert) => (
                                <div key={cert.id} className="mb-1">
                                    <p className="text-sm text-gray-800">{cert.name}</p>
                                    <p className="text-sm text-gray-800">{cert.issuer}</p>
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TemplateClassic;
