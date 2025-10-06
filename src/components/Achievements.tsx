import React from 'react';

const achievementsData = [
  {
    title: 'Neo4j Certified Professional',
  },
  {
    title: 'Contributor in GSSoC’25',
  },
  {
    title: 'Open Source Connect',
  },
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Achievements & Participation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievementsData.map((item, index) => (
            <div key={index} className="p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md text-center">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;