import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { formatDateRange, formatPhoneNumber } from '../../utils';

const MinimalTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, skills, projects } = resumeData;

  return (
    <div className="p-8 font-sans text-gray-800">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName}</h1>
        <p className="text-lg text-gray-600 mt-1">{personalInfo.title}</p>
        
        <div className="mt-3 text-sm text-gray-700 space-y-1">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{formatPhoneNumber(personalInfo.phone)}</div>}
          {(personalInfo.address || personalInfo.city) && (
            <div>
              {[
                personalInfo.address,
                [personalInfo.city, personalInfo.state, personalInfo.zipCode]
                  .filter(Boolean)
                  .join(', '),
              ]
                .filter(Boolean)
                .join(', ')}
            </div>
          )}
        </div>
        
        <div className="mt-2 text-sm space-x-4">
          {personalInfo.linkedin && (
            <a 
              href={personalInfo.linkedin} 
              className="text-gray-700 hover:text-gray-900"
              target="_blank" 
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          )}
          
          {personalInfo.github && (
            <a 
              href={personalInfo.github} 
              className="text-gray-700 hover:text-gray-900"
              target="_blank" 
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          )}
          
          {personalInfo.website && (
            <a 
              href={personalInfo.website} 
              className="text-gray-700 hover:text-gray-900"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Portfolio
            </a>
          )}
        </div>
      </header>
      
      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <h2 className="font-semibold uppercase text-sm tracking-wider text-gray-500 mb-3">About</h2>
          <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="font-semibold uppercase text-sm tracking-wider text-gray-500 mb-3">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="grid grid-cols-[1fr_auto] gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-sm">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </p>
                  </div>
                </div>
                {exp.description && (
                  <p className="mt-2 text-sm text-gray-700">{exp.description}</p>
                )}
                {exp.highlights.length > 0 && (
                  <ul className="mt-2 list-disc list-inside text-sm space-y-1">
                    {exp.highlights.map((highlight, index) => (
                      <li key={index} className="text-gray-700">{highlight}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="font-semibold uppercase text-sm tracking-wider text-gray-500 mb-3">Education</h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="grid grid-cols-[1fr_auto] gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.institution}</h3>
                    <p className="text-sm">
                      {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                      {edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </p>
                    {edu.location && <p className="text-sm text-gray-600">{edu.location}</p>}
                  </div>
                </div>
                {edu.description && (
                  <p className="mt-2 text-sm text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="font-semibold uppercase text-sm tracking-wider text-gray-500 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-2 py-1 border border-gray-200 rounded text-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}
      
      {/* Projects */}
      {projects.length > 0 && (
        <section>
          <h2 className="font-semibold uppercase text-sm tracking-wider text-gray-500 mb-3">Projects</h2>
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="grid grid-cols-[1fr_auto] gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {project.name}
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-xs font-normal text-gray-600 hover:text-gray-900"
                        >
                          (View)
                        </a>
                      )}
                    </h3>
                  </div>
                  {(project.startDate || project.endDate) && (
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {formatDateRange(project.startDate, project.endDate)}
                      </p>
                    </div>
                  )}
                </div>
                {project.description && (
                  <p className="mt-1 text-sm text-gray-700">{project.description}</p>
                )}
                {project.technologies.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-1.5 py-0.5 text-xs text-gray-600 bg-gray-100 rounded"
                      >
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
  );
};

export default MinimalTemplate;