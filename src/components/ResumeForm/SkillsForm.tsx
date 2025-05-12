import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Edit, Trash, Star, ChevronDown, ChevronUp } from 'lucide-react';

const SkillsForm: React.FC = () => {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResume();
  const { skills } = resumeData;

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    level: 3,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      level: 3,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLevelChange = (level: number) => {
    setFormData((prev) => ({ ...prev, level }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      updateSkill(isEditing, formData);
      setIsEditing(null);
    } else {
      addSkill(formData);
    }
    
    setIsAdding(false);
    resetForm();
  };

  const handleEdit = (id: string) => {
    const skillItem = skills.find((s) => s.id === id);
    if (skillItem) {
      setFormData({
        name: skillItem.name,
        level: skillItem.level,
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

  const renderStars = (level: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < level ? 'text-primary-500 fill-primary-500' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getLevelLabel = (level: number): string => {
    switch (level) {
      case 1:
        return 'Beginner';
      case 2:
        return 'Elementary';
      case 3:
        return 'Intermediate';
      case 4:
        return 'Advanced';
      case 5:
        return 'Expert';
      default:
        return 'Intermediate';
    }
  };

  // Group skills by first letter for better organization
  const groupedSkills = skills.reduce<Record<string, typeof skills>>((groups, skill) => {
    const firstLetter = skill.name.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(skill);
    return groups;
  }, {});

  return (
    <div>
      <h2 className="section-title">Skills</h2>
      <p className="text-gray-600 mb-6">
        Add your professional skills and rate your proficiency level.
      </p>

      {skills.length > 0 && (
        <div className="mb-6">
          {Object.keys(groupedSkills)
            .sort()
            .map((letter) => (
              <div key={letter} className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">{letter}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {groupedSkills[letter].map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-md hover:shadow-sm transition-shadow"
                    >
                      <div>
                        <div className="font-medium text-gray-900">{skill.name}</div>
                        <div className="flex items-center mt-1">
                          <div className="flex">{renderStars(skill.level)}</div>
                          <span className="ml-2 text-xs text-gray-500">
                            {getLevelLabel(skill.level)}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          type="button"
                          onClick={() => handleEdit(skill.id)}
                          className="p-1 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm('Are you sure you want to remove this skill?')) {
                              removeSkill(skill.id);
                            }
                          }}
                          className="p-1 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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
          Add Skill
        </button>
      )}

      {isAdding && (
        <form onSubmit={handleSubmit} className="mt-4 p-4 border border-gray-200 rounded-md bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {isEditing ? 'Edit Skill' : 'Add Skill'}
          </h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="label">
                Skill Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                placeholder="JavaScript"
                required
              />
            </div>

            <div>
              <label className="label">
                Proficiency Level: {getLevelLabel(formData.level)}
              </label>
              <div className="flex items-center space-x-1 mt-2">
                {[1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => handleLevelChange(level)}
                    className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        level <= formData.level
                          ? 'text-primary-500 fill-primary-500'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
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
                {isEditing ? 'Update' : 'Add'} Skill
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default SkillsForm;