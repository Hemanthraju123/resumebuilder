import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { School, Calendar, MapPin, Plus, Edit, Trash, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';
import { formatDateRange } from '../../utils';

const EducationForm: React.FC = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resumeData;

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    gpa: '',
  });

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      location: '',
      description: '',
      gpa: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      updateEducation(isEditing, formData);
      setIsEditing(null);
    } else {
      addEducation(formData);
      setIsAdding(false);
    }
    
    resetForm();
  };

  const handleEdit = (id: string) => {
    const educationItem = education.find((e) => e.id === id);
    if (educationItem) {
      setFormData({
        institution: educationItem.institution,
        degree: educationItem.degree,
        field: educationItem.field,
        startDate: educationItem.startDate,
        endDate: educationItem.endDate,
        location: educationItem.location,
        description: educationItem.description,
        gpa: educationItem.gpa || '',
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
      <h2 className="section-title">Education</h2>
      <p className="text-gray-600 mb-6">
        Add your educational background, starting with the most recent.
      </p>

      {education.length > 0 && (
        <div className="mb-6 space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="border border-gray-200 rounded-md overflow-hidden">
              <div
                className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
                onClick={() => toggleExpand(edu.id)}
              >
                <div className="flex items-center">
                  <GraduationCap className="h-5 w-5 text-gray-500 mr-2" />
                  <div>
                    <h3 className="font-medium text-gray-900">{edu.institution}</h3>
                    <p className="text-sm text-gray-600">
                      {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(edu.id);
                    }}
                    className="p-1 text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to remove this education entry?')) {
                        removeEducation(edu.id);
                      }
                    }}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                  {expandedItem === edu.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
              
              {expandedItem === edu.id && (
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {formatDateRange(edu.startDate, edu.endDate)}
                    </div>
                    {edu.location && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        {edu.location}
                      </div>
                    )}
                  </div>
                  {edu.gpa && (
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">GPA:</span> {edu.gpa}
                    </p>
                  )}
                  {edu.description && (
                    <p className="text-sm text-gray-600">{edu.description}</p>
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
          Add Education
        </button>
      )}

      {isAdding && (
        <form onSubmit={handleSubmit} className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {isEditing ? 'Edit Education' : 'Add Education'}
          </h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="institution" className="label">
                Institution *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <School className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="Harvard University"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="degree" className="label">
                  Degree *
                </label>
                <input
                  type="text"
                  id="degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="input"
                  placeholder="Bachelor of Science"
                  required
                />
              </div>

              <div>
                <label htmlFor="field" className="label">
                  Field of Study
                </label>
                <input
                  type="text"
                  id="field"
                  name="field"
                  value={formData.field}
                  onChange={handleChange}
                  className="input"
                  placeholder="Computer Science"
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    placeholder="Cambridge, MA"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="gpa" className="label">
                  GPA
                </label>
                <input
                  type="text"
                  id="gpa"
                  name="gpa"
                  value={formData.gpa}
                  onChange={handleChange}
                  className="input"
                  placeholder="3.8"
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
                placeholder="Relevant coursework, honors, or activities"
              />
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
                {isEditing ? 'Update' : 'Add'} Education
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EducationForm;