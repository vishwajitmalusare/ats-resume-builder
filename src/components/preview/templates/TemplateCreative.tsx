import React from 'react';
import type { ResumeData } from '../../../types/resume.types';

interface TemplateProps {
  resume: ResumeData;
}

const TemplateCreative: React.FC<TemplateProps> = ({ resume }) => {
  const { personal, summary, experience, education, skills, projects } = resume;

  return (
    <div className="p-8 max-w-[800px] mx-auto">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 bg-primary-600 text-white p-6 rounded-lg">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">
              {personal.firstName}
              <br />
              {personal.lastName}
            </h1>
            <p className="text-sm text-primary-100 mt-1">{personal.title}</p>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <p className="text-primary-200 text-xs uppercase tracking-wider">Email</p>
              <p>{personal.email}</p>
            </div>
            <div>
              <p className="text-primary-200 text-xs uppercase tracking-wider">Phone</p>
              <p>{personal.phone}</p>
            </div>
            <div>
              <p className="text-primary-200 text-xs uppercase tracking-wider">Location</p>
              <p>{personal.location}</p>
            </div>
          </div>

          {skills.length > 0 && (
            <div className="mt-6">
              <h3 className="text-primary-200 text-xs uppercase tracking-wider mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill.id} className="bg-primary-700 px-3 py-1 rounded-full text-xs">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="col-span-2 space-y-4">
          {summary && (
            <section>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">About</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Experience</h3>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{exp.position}</h4>
                      <p className="text-sm text-primary-600">{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <ul className="mt-1 space-y-0.5">
                    {exp.description.map((bullet, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-primary-600">▸</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Projects</h3>
              <div className="grid grid-cols-2 gap-3">
                {projects.map((project) => (
                  <div key={project.id} className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-bold text-sm text-gray-900">{project.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{project.description}</p>
                    {project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="text-xs bg-white px-2 py-0.5 rounded">
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

          {education.length > 0 && (
            <section>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Education</h3>
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{edu.degree}</h4>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                  </div>
                  <span className="text-xs text-gray-400">{edu.graduationDate}</span>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateCreative;