import React from 'react';
import { FaPython, FaJava, FaPhp, FaGitAlt, FaDatabase } from 'react-icons/fa';
import { DiDjango, DiFlask, DiMongodb } from 'react-icons/di';
import { SiFlutter, SiScikitlearn, SiTableau, SiPowerbi } from 'react-icons/si';

const skillsData = {
  Programming: [
    { name: 'Python', icon: <FaPython /> },
    { name: 'C', icon: null },
    { name: 'Java', icon: <FaJava /> },
    { name: 'Dart', icon: null },
    { name: 'PHP', icon: <FaPhp /> },
  ],
  Frameworks: [
    { name: 'Django', icon: <DiDjango /> },
    { name: 'Flask', icon: <DiFlask /> },
    { name: 'Flutter', icon: <SiFlutter /> },
    { name: 'scikit-learn', icon: <SiScikitlearn /> },
  ],
  Tools: [
    { name: 'Git', icon: <FaGitAlt /> },
    { name: 'VS Code', icon: null },
    { name: 'Power BI', icon: <SiPowerbi /> },
    { name: 'Tableau', icon: <SiTableau /> },
  ],
  Databases: [
    { name: 'SQL', icon: <FaDatabase /> },
    { name: 'MongoDB', icon: <DiMongodb /> },
  ],
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(skillsData).map(([category, skills]) => (
            <div key={category} className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{category}</h3>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="flex items-center space-x-2">
                    <span className="text-cyan-500">{skill.icon}</span>
                    <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;