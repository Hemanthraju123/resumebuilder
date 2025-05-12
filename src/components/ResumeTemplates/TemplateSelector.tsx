import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Check } from 'lucide-react';

interface TemplateCardProps {
  id: 'modern' | 'classic' | 'minimal';
  name: string;
  description: string;
  imageUrl: string;
  selected: boolean;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  id,
  name,
  description,
  imageUrl,
  selected,
  onSelect,
}) => {
  return (
    <div 
      className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${
        selected ? 'border-primary-600 ring-2 ring-primary-200' : 'border-gray-200'
      }`}
      onClick={onSelect}
    >
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        <img
          src={imageUrl}
          alt={`${name} template`}
          className="w-full h-full object-cover"
        />
        {selected && (
          <div className="absolute top-2 right-2 bg-primary-600 text-white rounded-full p-1">
            <Check className="h-4 w-4" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900">{name}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
};

const TemplateSelector: React.FC = () => {
  const { resumeData, updateTemplate } = useResume();
  const { template } = resumeData;

  const templates = [
    {
      id: 'modern' as const,
      name: 'Modern',
      description: 'A contemporary design with a clean layout and bold headings.',
      imageUrl: 'https://images.pexels.com/photos/7242851/pexels-photo-7242851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 'classic' as const,
      name: 'Classic',
      description: 'A traditional format perfect for conventional industries.',
      imageUrl: 'https://images.pexels.com/photos/7242747/pexels-photo-7242747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 'minimal' as const,
      name: 'Minimal',
      description: 'A streamlined, elegant design with subtle styling.',
      imageUrl: 'https://images.pexels.com/photos/7242695/pexels-photo-7242695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
  ];

  return (
    <div>
      <h2 className="section-title">Choose Template</h2>
      <p className="text-gray-600 mb-6">
        Select a template that best represents your professional style.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((t) => (
          <TemplateCard
            key={t.id}
            id={t.id}
            name={t.name}
            description={t.description}
            imageUrl={t.imageUrl}
            selected={template === t.id}
            onSelect={() => updateTemplate(t.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;