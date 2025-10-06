import React from 'react';

const experienceData = [
  {
    company: 'Codec Technologies',
    role: 'AI Intern',
    description: 'Developed AI models and documentation pipelines.',
  },
  {
    company: 'Edunet Foundation (Shell India Support)',
    role: 'AI & DA Intern',
    description: 'Built ML models for garbage classification.',
  },
  {
    company: 'Webstack Academy',
    role: 'MERN Stack Developer Intern',
    description: 'Creating scalable full-stack applications.',
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Experience
        </h2>
        <div className="space-y-8">
          {experienceData.map((item, index) => (
            <div key={index} className="p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white">{item.company}</h3>
              <p className="font-semibold text-gray-700 dark:text-gray-300">{item.role}</p>
              <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;