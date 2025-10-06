import React from 'react';
import projects from '../data/projects.json';
import { Github } from 'lucide-react';

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
              </div>
              <a href={project.github} className="mt-4 text-cyan-600 dark:text-cyan-400 hover:underline flex items-center">
                <Github size={20} className="mr-2" />
                View on GitHub
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;