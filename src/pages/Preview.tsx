import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, Edit, FileText } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import ModernTemplate from '../components/ResumeTemplates/ModernTemplate';
import ClassicTemplate from '../components/ResumeTemplates/ClassicTemplate';
import MinimalTemplate from '../components/ResumeTemplates/MinimalTemplate';
import { generatePDF } from '../utils';

const Preview: React.FC = () => {
  const { resumeData } = useResume();
  const navigate = useNavigate();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleEdit = () => {
    navigate('/builder');
  };

  const handleDownload = () => {
    if (resumeRef.current) {
      const filename = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume`;
      generatePDF(resumeRef.current, filename);
    }
  };

  const renderTemplate = () => {
    switch (resumeData.template) {
      case 'modern':
        return <ModernTemplate />;
      case 'classic':
        return <ClassicTemplate />;
      case 'minimal':
        return <MinimalTemplate />;
      default:
        return <ModernTemplate />;
    }
  };

  const isResumeEmpty = 
    !resumeData.personalInfo.fullName && 
    resumeData.education.length === 0 && 
    resumeData.experience.length === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resume Preview</h1>
          <p className="mt-2 text-gray-600">
            Preview and download your resume
          </p>
        </div>
        <div className="mt-4 sm:mt-0 space-x-3 flex">
          <button
            onClick={handleEdit}
            className="btn-secondary flex items-center"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Resume
          </button>
          <button
            onClick={handleDownload}
            disabled={isResumeEmpty}
            className={`btn-primary flex items-center ${
              isResumeEmpty ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </button>
        </div>
      </div>

      {isResumeEmpty ? (
        <div className="bg-white rounded-lg shadow-smooth p-10 text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto" />
          <h3 className="mt-4 text-xl font-medium text-gray-900">No resume data</h3>
          <p className="mt-2 text-gray-600">
            You haven't added any information to your resume yet. Start building your resume to see a preview.
          </p>
          <button
            onClick={handleEdit}
            className="mt-6 btn-primary"
          >
            Build Your Resume
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-smooth p-6">
          <div 
            ref={resumeRef} 
            className="bg-white max-w-[21cm] mx-auto border border-gray-200"
            style={{ minHeight: '29.7cm' }}
          >
            {renderTemplate()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Preview;