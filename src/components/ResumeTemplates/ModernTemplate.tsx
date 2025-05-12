import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { AtSign, Phone, MapPin, Linkedin, Github, Globe, Calendar } from 'lucide-react';
import { formatDateRange, formatPhoneNumber } from '../../utils';

const ModernTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, skills, projects } = resumeData;

  return (
    <div className="p-8 font-sans text-gray-800">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName}</h1>
        <p className="text-lg text-primary-600 font-medium mt-1">{personalInfo.title}</p>
        
        <div className="mt-3 flex flex-wrap gap-3">
          {personalInfo.email && (
            <div className="flex items-center text-sm">
              <AtSign className="h-4 w-4 text-gray-500 mr-1" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 text-gray-500 mr-1" />
              <span>{formatPhoneNumber(personalInfo.phone)}</span>
            </div>
          )}
          
          {(personalInfo.address || personalInfo.city) && (
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 text-gray-500 mr-1" />
              <span>
                {[
                  personalInfo.address,
                  [personalInfo.city, personalInfo.state, personalInfo.zipCode]
                    .filter(Boolean)
                    .join(', '),
                ]
                  .filter(Boolean)
                  .join(', ')}
              </span>
            </div>
          )}
          
          {personalInfo.linkedin && (
            <div className="flex items-center text-sm">
              <Linkedin className="h-4 w-4 text-gray-500 mr-1" />
              <a 
                href={personalInfo.linkedin} 
                className="text-primary-600 hover:underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          )}
          
          {personalInfo.github && (
            <div className="flex items-center text-sm">
              <Github className="h-4 w-4 text-gray-500 mr-1" />
              <a 
                href={personalInfo.github} 
                className="text-primary-600 hover:underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center text-sm">
              <Globe className="h-4 w-4 text-gray-500 mr-1" />
              <a 
                href={personalInfo.website} 
                className="text-primary-600 hover:underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Portfolio
              </a>
            </div>
          )}
        </div>
      </header>
      
      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-primary-500 pb-1 mb-3">Professional Summary</h2>
          <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-primary-500 pb-1 mb-3">Work Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-semibold text-gray-900">{exp.position}</h3>
                  <div className="flex items-center text-xs text-gray-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </div>
                </div>
                <div className="flex justify-between items-baseline mt-1">
                  <p className="text-sm text-primary-600">{exp.company}</p>
                  {exp.location && <p className="text-xs text-gray-600">{exp.location}</p>}
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
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-primary-500 pb-1 mb-3">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-semibold text-gray-900">{edu.institution}</h3>
                  <div className="flex items-center text-xs text-gray-600">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </div>
                </div>
                <div className="flex justify-between items-baseline mt-1">
                  <p className="text-sm text-primary-600">
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                    {edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
                  </p>
                  {edu.location && <p className="text-xs text-gray-600">{edu.location}</p>}
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
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-primary-500 pb-1 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-800"
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
          <h2 className="text-lg font-bold text-gray-800 border-b-2 border-primary-500 pb-1 mb-3">Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-md font-semibold text-gray-900">
                    {project.name}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-xs text-primary-600 hover:underline"
                      >
                        View Project
                      </a>
                    )}
                  </h3>
                  {(project.startDate || project.endDate) && (
                    <div className="flex items-center text-xs text-gray-600">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDateRange(project.startDate, project.endDate)}
                    </div>
                  )}
                </div>
                {project.description && (
                  <p className="mt-1 text-sm text-gray-700">{project.description}</p>
                )}
                {project.technologies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-primary-50 text-primary-700 rounded text-xs"
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

export default ModernTemplate;