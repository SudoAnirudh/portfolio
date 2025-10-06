import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          About Me
        </h2>
        <div className="p-8 bg-gray-100 rounded-lg dark:bg-gray-900">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            A brief personal narrative showcasing passion for AI, curiosity for emerging tech, and commitment to solving real-world challenges.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;