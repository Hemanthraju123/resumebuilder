import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ResumeContextType, ResumeData } from '../types';
import { generateId } from '../utils';

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    title: '',
    summary: '',
    linkedin: '',
    website: '',
    github: '',
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certificates: [],
  languages: [],
  template: 'modern',
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    // Try to load saved data from localStorage
    try {
      const savedData = localStorage.getItem('resumeData');
      return savedData ? JSON.parse(savedData) : initialResumeData;
    } catch (error) {
      console.error('Error loading resume data:', error);
      return initialResumeData;
    }
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
    } catch (error) {
      console.error('Error saving resume data:', error);
    }
  }, [resumeData]);

  const updatePersonalInfo = (info: Partial<typeof resumeData.personalInfo>) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...info,
      },
    }));
  };

  const addEducation = (education: Omit<typeof resumeData.education[0], 'id'>) => {
    const newEducation = { ...education, id: generateId() };
    setResumeData((prev) => ({
      ...prev,
      education: [newEducation, ...prev.education],
    }));
    toast.success('Education added successfully');
  };

  const updateEducation = (id: string, education: Partial<typeof resumeData.education[0]>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, ...education } : edu
      ),
    }));
    toast.success('Education updated successfully');
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
    toast.success('Education removed successfully');
  };

  const addExperience = (experience: Omit<typeof resumeData.experience[0], 'id'>) => {
    const newExperience = { ...experience, id: generateId() };
    setResumeData((prev) => ({
      ...prev,
      experience: [newExperience, ...prev.experience],
    }));
    toast.success('Experience added successfully');
  };

  const updateExperience = (id: string, experience: Partial<typeof resumeData.experience[0]>) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, ...experience } : exp
      ),
    }));
    toast.success('Experience updated successfully');
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
    toast.success('Experience removed successfully');
  };

  const addSkill = (skill: Omit<typeof resumeData.skills[0], 'id'>) => {
    const newSkill = { ...skill, id: generateId() };
    setResumeData((prev) => ({
      ...prev,
      skills: [newSkill, ...prev.skills],
    }));
    toast.success('Skill added successfully');
  };

  const updateSkill = (id: string, skill: Partial<typeof resumeData.skills[0]>) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...skill } : s)),
    }));
    toast.success('Skill updated successfully');
  };

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
    toast.success('Skill removed successfully');
  };

  const addProject = (project: Omit<typeof resumeData.projects[0], 'id'>) => {
    const newProject = { ...project, id: generateId() };
    setResumeData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
    }));
    toast.success('Project added successfully');
  };

  const updateProject = (id: string, project: Partial<typeof resumeData.projects[0]>) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...project } : p)),
    }));
    toast.success('Project updated successfully');
  };

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
    toast.success('Project removed successfully');
  };

  const updateTemplate = (template: ResumeData['template']) => {
    setResumeData((prev) => ({
      ...prev,
      template,
    }));
    toast.success('Template updated successfully');
  };

  const resetResume = () => {
    setResumeData(initialResumeData);
    localStorage.removeItem('resumeData');
    toast.success('Resume data has been reset');
  };

  const saveResume = () => {
    try {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
      toast.success('Resume saved successfully');
    } catch (error) {
      console.error('Error saving resume:', error);
      toast.error('Failed to save resume');
    }
  };

  const loadResume = (): boolean => {
    try {
      const savedData = localStorage.getItem('resumeData');
      if (savedData) {
        setResumeData(JSON.parse(savedData));
        return true;
      }
    } catch (error) {
      console.error('Error loading resume:', error);
    }
    return false;
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updatePersonalInfo,
        addEducation,
        updateEducation,
        removeEducation,
        addExperience,
        updateExperience,
        removeExperience,
        addSkill,
        updateSkill,
        removeSkill,
        addProject,
        updateProject,
        removeProject,
        updateTemplate,
        resetResume,
        saveResume,
        loadResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};