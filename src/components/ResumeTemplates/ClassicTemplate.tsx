import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { AtSign, Phone, MapPin, Linkedin, Github, Globe, Calendar } from 'lucide-react';
import { formatDateRange, formatPhoneNumber } from '../../utils';

const ClassicTemplate: React.FC = () => {
  const { resumeData } = useResume();
  const { personalInfo, education, experience, skills, projects } = resumeData;

  return (
    <div className="p-8 font-serif text-gray-900">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-wider">{personalInfo.fullName}</h1>
        {personalInfo.title && (
          <p className="text-lg text-gray-700 mt-1">{personalInfo.title}</p>
        )}
        
        <div className="mt-3 flex flex-wrap justify-center gap-4 text-sm">
          {personalInfo.email && (
            <div className="flex items-center">
              <AtSign className="h-4 w-4 text-gray-600 mr-1" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 text-gray-600 mr-1" />
              <span>{formatPhoneNumber(personalInfo.phone)}</span>
            </div>
          )}
          
          {(personalInfo.address || personalInfo.city) && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-gray-600 mr-1" />
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
        </div>
        
        <div className="mt-2 flex flex-wrap justify-center gap-4 text-sm">
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin className="h-4 w-4 text-gray-600 mr-1" />
              <a 
                href={personalInfo.linkedin} 
                className="hover:underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          )}
          
          {personalInfo.github && (
            <div className="flex items-center">
              <Github className="h-4 w-4 text-gray-600 mr-1" />
              <a 
                href={personalInfo.github} 
                className="hover:underline"
                target="_blank" 
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 text-gray-600 mr-1" />
              <a 
                href={personalInfo.website} 
                className="hover:underline"
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
          <h2 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3">Professional Summary</h2>
          <p className="text-sm leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3">Professional Experience</h2>
          <div className="space-y-5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-bold">{exp.position}</h3>
                  <div className="text-sm">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </div>
                </div>
                <div className="flex justify-between items-baseline mt-1">
                  <p className="font-semibold">{exp.company}</p>
                  {exp.location && <p className="text-sm italic">{exp.location}</p>}
                </div>
                {exp.description && (
                  <p className="mt-2 text-sm">{exp.description}</p>
                )}
                {exp.highlights.length > 0 && (
                  <ul className="mt-2 list-disc list-inside text-sm space-y-1">
                    {exp.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
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
          <h2 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3">Education</h2>
          <div className="space-y-5">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-bold">{edu.institution}</h3>
                  <div className="text-sm">
                    {formatDateRange(edu.startDate, edu.endDate)}
                  </div>
                </div>
                <div className="flex justify-between items-baseline mt-1">
                  <p className="font-semibold">
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </p>
                  {edu.location && <p className="text-sm italic">{edu.location}</p>}
                </div>
                {edu.gpa && (
                  <p className="mt-1 text-sm">GPA: {edu.gpa}</p>
                )}
                {edu.description && (
                  <p className="mt-2 text-sm">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3">Skills</h2>
          <div className="text-sm">
            {skills.map((skill, index) => (
              <span key={skill.id}>
                {skill.name}
                {index < skills.length - 1 ? ' • ' : ''}
              </span>
            ))}
          </div>
        </section>
      )}
      
      {/* Projects */}
      {projects.length > 0 && (
        <section>
          <h2 className="text-xl font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3">Projects</h2>
          <div className="space-y-5">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-bold">
                    {project.name}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-sm normal-case font-normal hover:underline"
                      >
                        View Project
                      </a>
                    )}
                  </h3>
                  {(project.startDate || project.endDate) && (
                    <div className="text-sm">
                      {formatDateRange(project.startDate, project.endDate)}
                    </div>
                  )}
                </div>
                {project.description && (
                  <p className="mt-1 text-sm">{project.description}</p>
                )}
                {project.technologies.length > 0 && (
                  <p className="mt-1 text-sm italic">
                    Technologies: {project.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;