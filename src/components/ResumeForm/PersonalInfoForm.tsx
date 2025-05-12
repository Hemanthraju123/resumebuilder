import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { User, AtSign, Phone, MapPin, Briefcase, FileText, Link as LinkIcon, Github, Linkedin } from 'lucide-react';

const PersonalInfoForm: React.FC = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo } = resumeData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };

  return (
    <div>
      <h2 className="section-title">Personal Information</h2>
      <p className="text-gray-600 mb-6">
        Add your personal details to help employers contact you.
      </p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="fullName" className="label">
              Full Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={personalInfo.fullName || ''}
                onChange={handleChange}
                className="input pl-10"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="title" className="label">
              Professional Title *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="title"
                name="title"
                value={personalInfo.title || ''}
                onChange={handleChange}
                className="input pl-10"
                placeholder="Software Engineer"
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className="label">
              Email *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AtSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={personalInfo.email || ''}
                onChange={handleChange}
                className="input pl-10"
                placeholder="johndoe@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="label">
              Phone *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={personalInfo.phone || ''}
                onChange={handleChange}
                className="input pl-10"
                placeholder="(123) 456-7890"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="address" className="label">
            Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="address"
              name="address"
              value={personalInfo.address || ''}
              onChange={handleChange}
              className="input pl-10"
              placeholder="123 Main St"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <label htmlFor="city" className="label">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={personalInfo.city || ''}
              onChange={handleChange}
              className="input"
              placeholder="San Francisco"
            />
          </div>

          <div>
            <label htmlFor="state" className="label">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={personalInfo.state || ''}
              onChange={handleChange}
              className="input"
              placeholder="CA"
            />
          </div>

          <div>
            <label htmlFor="zipCode" className="label">
              Zip Code
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={personalInfo.zipCode || ''}
              onChange={handleChange}
              className="input"
              placeholder="94105"
            />
          </div>
        </div>

        <div>
          <label htmlFor="summary" className="label">
            Professional Summary *
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 flex items-start pointer-events-none">
              <FileText className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              id="summary"
              name="summary"
              value={personalInfo.summary || ''}
              onChange={handleChange}
              rows={4}
              className="input pl-10"
              placeholder="Experienced software engineer with a passion for developing innovative solutions..."
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Write a 2-4 sentence summary highlighting your experience and key skills.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Social Links</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="linkedin" className="label">
                LinkedIn
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Linkedin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  id="linkedin"
                  name="linkedin"
                  value={personalInfo.linkedin || ''}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="https://linkedin.com/in/johndoe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="github" className="label">
                GitHub
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Github className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  id="github"
                  name="github"
                  value={personalInfo.github || ''}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="https://github.com/johndoe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="website" className="label">
                Personal Website
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={personalInfo.website || ''}
                  onChange={handleChange}
                  className="input pl-10"
                  placeholder="https://johndoe.com"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;