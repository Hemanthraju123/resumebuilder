import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { 
  FolderGit2, 
  Calendar, 
  Link as LinkIcon, 
  Plus, 
  Edit, 
  Trash, 
  ChevronDown, 
  ChevronUp, 
  Code 
} from 'lucide-react';
import { formatDateRange } from '../../utils';

const ProjectsForm: React.FC = () => {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  const { projects } = resumeData;

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    url: '',
    technologies: [] as string[],
  });
  const [technology, setTechnology] = useState('');

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      url: '',
      technologies: [],
    });
    setTechnology('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechnologyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTechnology(e.target.value);
  };

  const addTechnology = () => {
    if (technology.trim() !== '') {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, technology.trim()],
      }));
      setTechnology('');
    }
  };

  const removeTechnology = (index: number) => {
    const newTechnologies = formData.technologies.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, technologies: newTechnologies }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add the pending technology if there is one
    if (technology.trim() !== '') {
      addTechnology();
    }
    
    if (isEditing) {
      updateProject(isEditing, formData);
      setIsEditing(null);
    } else {
      addProject(formData);
      setIsAdding(false);
    }
    
    resetForm();
  };

  const handleEdit = (id: string) => {
    const projectItem = projects.find((p) => p.id === id);
    if (projectItem) {
      setFormData({
        name: projectItem.name,
        description: projectItem.description,
        startDate: projectItem.startDate,
        endDate: projectItem.endDate,
        url: projectItem.url || '',
        technologies: projectItem.technologies,
      });
      setIsEditing(id);
      setIsAdding(true);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(null);
    resetForm();
  };

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div>
      <h2 className="section-title">Projects</h2>
      <p className="text-gray-600 mb-6">
        Add your notable projects to showcase your practical skills.
      </p>

      {projects.length > 0 && (
        <div className="mb-6 space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="border border-gray-200 rounded-md overflow-hidden">
              <div
                className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
                onClick={() => toggleExpand(project.id)}
              >
                <div className="flex items-center">
                  <FolderGit2 className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600 truncate max-w-xs">
                      {project.technologies.slice(0, 3).join(', ')}
                      {project.technologies.length > 3 ? '...' : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(project.id);
                    }}
                    className="p-1 text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to remove this project?')) {
                        removeProject(project.id);
                      }
                    }}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                  {expandedItem === project.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
              
              {expandedItem === project.id && (
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {formatDateRange(project.startDate, project.endDate)}
                    </div>
                    {project.url && (
                      <div className="flex items-center text-sm text-blue-600">
                        <LinkIcon className="h-4 w-4 mr-2 text-blue-500" />
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          Project Link
                        </a>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                  {project.technologies.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <Code className="h-4 w-4 mr-1 text-gray-500" />
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!isAdding && (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="flex items-center text-primary-600 hover:text-primary-800 font-medium"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Project
        </button>
      )}

      {isAdding && (
        <form onSubmit={handleSubmit} className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {isEditing ? 'Edit Project' : 'Add Project'}
          </h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="label">
                Project Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FolderGit2 className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="E-commerce Platform"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="startDate" className="label">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              <div>
                <label htmlFor="endDate" className="label">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="url" className="label">
                Project URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="label">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="input"
                placeholder="Brief description of the project, its purpose, and your role"
                required
              />
            </div>

            <div>
              <label className="label mb-2">Technologies</label>
              <div className="flex mb-2">
                <input
                  type="text"
                  value={technology}
                  onChange={handleTechnologyChange}
                  className="input rounded-r-none"
                  placeholder="React"
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="flex items-center justify-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100"
                >
                  Add
                </button>
              </div>
              
              {formData.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTechnology(index)}
                        className="ml-1.5 text-blue-600 hover:text-blue-800 focus:outline-none"
                      >
                        <span className="sr-only">Remove</span>
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {isEditing ? 'Update' : 'Add'} Project
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProjectsForm;