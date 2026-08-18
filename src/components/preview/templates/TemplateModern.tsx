import React from "react";
import type { ResumeData } from "../../../types/resume.types";

interface TemplateProps {
    resume: ResumeData;
}

const TemplateModern: React.FC<TemplateProps> = ({ resume }) => {
    const { personal, summary, experience, education, skills, projects, certifications } = resume;

    const limitedExperience = experience.slice(0, 3);
    const limitedProjects = projects.slice(0, 2);
    const limitedSkills = skills.slice(0, 15);
    const limitedCertifications = certifications.slice(0, 3);

    return (
        <div id="resume-preview" className="p-6 max-w-[795px] mx-auto bg-white" style={{ fontSize: '11px' }}>
            <div className="border-b-2 border-primary-600 pb-2 mb-3">
                <h1 className="text-2xl font-bold text-gray-900">
                    {personal.firstName} {personal.lastName}
                </h1>
                <p className="text-base text-gray-600 font-medium mt-0.5">{personal.title}</p>
                <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-600">
                    <span>{personal.email}</span>
                    <span>|</span>
                    <span>{personal.phone}</span>
                    <span>|</span>
                    <span>{personal.location}</span>
                    {personal.linkedin && <><span>|</span><span>{personal.linkedin}</span></>}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-3">
                    {summary && (
                        <section>
                            <h3 className="text-[10px] font-semibold text-gray-800 uppercase tracking-wider mb-1">Summary</h3>
                            <p className="text-[11px] text-gray-600 leading-relaxed">{summary}</p>
                        </section>
                    )}

                    {limitedExperience.length > 0 && (
                        <section>
                            <h3 className="text-[10px] font-semibold text-gray-800 uppercase tracking-wider mb-1">Experience</h3>
                            {limitedExperience.map((exp) => (
                                <div key={exp.id} className="mb-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold text-gray-800 text-[11px]">{exp.position}</h4>
                                            <p className="text-[11px] text-primary-600 font-medium">{exp.company}</p>
                                        </div>
                                        <span className="text-[10px] text-gray-500 whitespace-nowrap">
                                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
                                    <ul className="mt-0.5 space-y-0.5">
                                        {exp.description.slice(0, 3).map((bullet, idx) => (
                                            <li key={idx} className="text-[11px] text-gray-600 flex items-start gap-1.5">
                                                <span className="text-primary-600 font-bold">•</span>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </section>
                    )}

                    {limitedProjects.length > 0 && (
                        <section>
                            <h3 className="text-[10px] font-semibold text-gray-800 uppercase tracking-wider mb-1.5">Projects</h3>
                            <div className="space-y-1.5">
                                {limitedProjects.map((project) => (
                                    <div key={project.id}>
                                        <h4 className="font-semibold text-[11px] text-gray-800">{project.name}</h4>
                                        <p className="text-[11px] text-gray-600">{project.description}</p>
                                        {project.techStack.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-0.5">
                                                {project.techStack.slice(0, 4).map((tech) => (
                                                    <span key={tech} className="text-[10px] bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="col-span-1 space-y-3">
                    {limitedSkills.length > 0 && (
                        <section>
                            <h3 className="text-[10px] font-semibold text-gray-800 uppercase tracking-wider mb-1.5">Skills</h3>
                            <div className="flex flex-wrap gap-1">
                                {limitedSkills.slice(0, 10).map((skill) => (
                                    <span
                                        key={skill.id}
                                        className={`text-[10px] px-2 py-0.5 rounded-full ${skill.category === 'technical'
                                                ? 'bg-primary-100 text-primary-700'
                                                : skill.category === 'soft'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-purple-100 text-purple-700'
                                            }`}
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                                {limitedSkills.length > 10 && (
                                    <span className="text-[10px] text-gray-400">+{limitedSkills.length - 10} more</span>
                                )}
                            </div>
                        </section>
                    )}

                    {education.length > 0 && (
                        <section>
                            <h3 className="text-[10px] font-semibold text-gray-800 uppercase tracking-wider mb-1.5">Education</h3>
                            {education.slice(0, 2).map((edu) => (
                                <div key={edu.id} className="mb-1.5">
                                    <h4 className="font-semibold text-gray-800 text-[11px]">{edu.degree}</h4>
                                    <p className="text-[11px] text-gray-600">{edu.institution}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {limitedCertifications.length > 0 && (
                        <section>
                            <h3 className="text-[10px] font-semibold text-gray-800 uppercase tracking-wider mb-1.5">Certifications</h3>
                            {limitedCertifications.map((cert) => (
                                <div key={cert.id} className="mb-1">
                                    <p className="font-medium text-[11px] text-gray-800">{cert.name}</p>
                                    <p className="text-[10px] text-gray-600">{cert.issuer}</p>
                                </div>
                            ))}
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TemplateModern;
