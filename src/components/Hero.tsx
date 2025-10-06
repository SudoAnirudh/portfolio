import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="flex items-center justify-center min-h-screen text-center bg-gray-50 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl font-bold text-gray-900 dark:text-white md:text-7xl"
        >
          Anirudh S
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-gray-600 dark:text-gray-300 md:text-xl"
        >
          AI & ML Engineer | Building Intelligent Solutions for a Smarter Future.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center space-x-4"
        >
          <a href="#" className="px-6 py-2 text-white bg-cyan-600 rounded-lg hover:bg-cyan-700">
            View Resume
          </a>
          <a href="#projects" className="px-6 py-2 text-gray-900 bg-gray-200 rounded-lg dark:text-white dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
            Explore Projects
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center space-x-4"
        >
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-500">
            <Github size={24} />
          </a>
          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-500">
            <Linkedin size={24} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;