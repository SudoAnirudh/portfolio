import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto py-4 px-4 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Anirudh S. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;