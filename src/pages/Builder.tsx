import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Eye, Trash2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useResume } from '../context/ResumeContext';
import PersonalInfoForm from '../components/ResumeForm/PersonalInfoForm';
import EducationForm from '../components/ResumeForm/EducationForm';
import ExperienceForm from '../components/ResumeForm/ExperienceForm';
import SkillsForm from '../components/ResumeForm/SkillsForm';
import ProjectsForm from '../components/ResumeForm/ProjectsForm';
import TemplateSelector from '../components/ResumeTemplates/TemplateSelector';

const Builder: React.FC = () => {
  const navigate = useNavigate();
  const { saveResume, resetResume } = useResume();
  const [activeSection, setActiveSection] = useState<string>('personal');

  const sections = [
    { id: 'personal', title: 'Personal Info', component: PersonalInfoForm },
    { id: 'education', title: 'Education', component: EducationForm },
    { id: 'experience', title: 'Experience', component: ExperienceForm },
    { id: 'skills', title: 'Skills', component: SkillsForm },
    { id: 'projects', title: 'Projects', component: ProjectsForm },
    { id: 'templates', title: 'Templates', component: TemplateSelector },
  ];

  const handleSave = () => {
    saveResume();
  };

  const handlePreview = () => {
    saveResume();
    navigate('/preview');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all resume data? This action cannot be undone.')) {
      resetResume();
    }
  };

  const ActiveComponent = sections.find(section => section.id === activeSection)?.component || PersonalInfoForm;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
        <p className="mt-2 text-gray-600">
          Fill in the form below to create your professional resume
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-smooth overflow-hidden">
            <nav className="flex flex-col">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-3 text-left flex items-center ${
                    activeSection === section.id
                      ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium">{section.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Action buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={handleSave}
              className="w-full btn-primary flex items-center justify-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Resume
            </button>
            <button
              onClick={handlePreview}
              className="w-full btn-secondary flex items-center justify-center"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </button>
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center px-4 py-2 border border-red-300 rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Reset
            </button>
          </div>

          {/* Help box */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Tips</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Fill out all sections for a complete resume. Use the preview button to see how your resume looks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-smooth p-6 animate-fade-in">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;