import React from 'react';

const educationData = [
  {
    institution: 'Srinivas Institute of Technology, Mangalore',
    degree: 'B.E. in Artificial Intelligence & Machine Learning',
    duration: '2022–2026',
  },
  {
    institution: 'NHSS Vakayad',
    degree: 'Pre-University (Bio Science)',
    duration: '2020–2022',
  },
  {
    institution: 'GHSS Naduvannur',
    degree: 'Secondary School',
    duration: '2019–2020',
  },
];

const Education = () => {
  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Education
        </h2>
        <div className="relative">
          <div className="border-l-2 border-cyan-500 absolute h-full top-0 left-1/2 transform -translate-x-1/2"></div>
          {educationData.map((item, index) => (
            <div key={index} className={`mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
              <div className="w-5/12"></div>
              <div className="z-10 flex items-center justify-center w-8 h-8 bg-cyan-500 rounded-full">
                <div className="w-4 h-4 bg-white dark:bg-gray-900 rounded-full"></div>
              </div>
              <div className="w-5/12">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.institution}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.degree}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{item.duration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;