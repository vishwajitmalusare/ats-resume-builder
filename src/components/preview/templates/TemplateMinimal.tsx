import React from "react";
import type { ResumeData } from "../../../types/resume.types";

interface TemplateProps {
  resume: ResumeData;
}

const TemplateMinimal: React.FC<TemplateProps> = ({ resume }) => {
  const { personal, summary, experience, education, skills } = resume;

  return (
    <div className="p-8 max-w-[800px] mx-auto">
      <div className="mb-6">
        <h1 className="text-4xl font-light text-gray-900">
          {personal.firstName} {personal.lastName}
        </h1>
        <p className="text-lg text-gray-500 mt-1">{personal.title}</p>
        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
          <span>{personal.email}</span>
          <span>{personal.phone}</span>
          <span>{personal.location}</span>
        </div>
      </div>

      <hr className="border-gray-200 mb-6" />

      {summary && (
        <section className="mb-6">
          <p className="text-sm text-gray-600 leading-relaxed">{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Experience
          </h3>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{exp.position}</h4>
                  <p className="text-sm text-gray-600">{exp.company}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <ul className="mt-1 space-y-0.5">
                {exp.description.map((bullet, idx) => (
                  <li key={idx} className="text-sm text-gray-500 flex items-start gap-2">
                    <span className="text-gray-300">—</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      <div className="grid grid-cols-2 gap-6">
        {skills.length > 0 && (
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="text-sm text-gray-600">
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Education
            </h3>
            {education.map((edu) => (
              <div key={edu.id} className="mb-2">
                <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                <p className="text-sm text-gray-600">{edu.institution}</p>
                <p className="text-xs text-gray-400">{edu.graduationDate}</p>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default TemplateMinimal;
