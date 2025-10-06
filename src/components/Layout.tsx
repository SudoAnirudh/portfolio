import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;