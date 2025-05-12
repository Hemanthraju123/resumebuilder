import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Briefcase, Calendar, MapPin, Plus, Edit, Trash, ChevronDown, ChevronUp, ListChecks } from 'lucide-react';
import { formatDateRange } from '../../utils';

const ExperienceForm: React.FC = () => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
  const { experience } = resumeData;

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    highlights: [''],
    current: false,
  });

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
      highlights: [''],
      current: false,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    setFormData((prev) => ({ ...prev, highlights: newHighlights }));
  };

  const addHighlight = () => {
    setFormData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, ''],
    }));
  };

  const removeHighlight = (index: number) => {
    const newHighlights = formData.highlights.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, highlights: newHighlights }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty highlights
    const filteredHighlights = formData.highlights.filter(h => h.trim() !== '');
    
    if (isEditing) {
      updateExperience(isEditing, { ...formData, highlights: filteredHighlights });
      setIsEditing(null);
    } else {
      addExperience({ ...formData, highlights: filteredHighlights });
      setIsAdding(false);
    }
    
    resetForm();
  };

  const handleEdit = (id: string) => {
    const experienceItem = experience.find((e) => e.id === id);
    if (experienceItem) {
      setFormData({
        company: experienceItem.company,
        position: experienceItem.position,
        startDate: experienceItem.startDate,
        endDate: experienceItem.endDate,
        location: experienceItem.location,
        description: experienceItem.description,
        highlights: experienceItem.highlights.length > 0 ? experienceItem.highlights : [''],
        current: experienceItem.current,
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
      <h2 className="section-title">Work Experience</h2>
      <p className="text-gray-600 mb-6">
        Add your professional experience, starting with the most recent.
      </p>

      {experience.length > 0 && (
        <div className="mb-6 space-y-4">
          {experience.map((exp) => (
            <div key={exp.id} className="border border-gray-200 rounded-md overflow-hidden">
              <div
                className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
                onClick={() => toggleExpand(exp.id)}
              >
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <h3 className="font-medium text-gray-900">{exp.position}</h3>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(exp.id);
                    }}
                    className="p-1 text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to remove this experience entry?')) {
                        removeExperience(exp.id);
                      }
                    }}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                  {expandedItem === exp.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
              
              {expandedItem === exp.id && (
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </div>
                    {exp.location && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {exp.location}
                      </div>
                    )}
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-600 mb-3">{exp.description}</p>
                  )}
                  {exp.highlights.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <ListChecks className="h-4 w-4 mr-1 text-gray-500" />
                        Key Achievements
                      </h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {exp.highlights.map((highlight, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            {highlight}
                          </li>
                        ))}
                      </ul>
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
          Add Experience
        </button>
      )}

      {isAdding && (
        <form onSubmit={handleSubmit} className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {isEditing ? 'Edit Experience' : 'Add Experience'}
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="company" className="label">
                  Company *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="input pl-10"
                    placeholder="Google"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="position" className="label">
                  Position *
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="input"
                  placeholder="Senior Software Engineer"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="startDate" className="label">
                  Start Date *
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="input"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <label htmlFor="endDate" className="label">
                    End Date
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="current"
                      name="current"
                      checked={formData.current}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="current" className="ml-2 text-sm text-gray-700">
                      I currently work here
                    </label>
                  </div>
                </div>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="input"
                  disabled={formData.current}
                  required={!formData.current}
                />
              </div>
            </div>

            <div>
              <label htmlFor="location" className="label">
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="Mountain View, CA"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="input"
                placeholder="Brief description of your role and responsibilities"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="label mb-0">Key Achievements</label>
                <button
                  type="button"
                  onClick={addHighlight}
                  className="text-sm text-primary-600 hover:text-primary-800 font-medium flex items-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Item
                </button>
              </div>
              <div className="space-y-2">
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => handleHighlightChange(index, e.target.value)}
                      className="input flex-grow"
                      placeholder="Achieved or accomplished..."
                    />
                    {formData.highlights.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeHighlight(index)}
                        className="ml-2 p-2 text-red-600 hover:text-red-800"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Add bullet points highlighting your achievements and responsibilities.
              </p>
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
                {isEditing ? 'Update' : 'Add'} Experience
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ExperienceForm;