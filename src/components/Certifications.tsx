import React from 'react';
import certifications from '../data/certifications.json';

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Certifications
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <div key={index} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{cert.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;