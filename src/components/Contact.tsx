import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState('');

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      // Replace with your EmailJS Service ID, Template ID, and User ID
      emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_USER_ID')
        .then((result) => {
          console.log(result.text);
          setStatus('Message sent successfully!');
          form.current?.reset();
        }, (error) => {
          console.log(error.text);
          setStatus('Failed to send message. Please try again later.');
        });
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Contact Me
        </h2>
        <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <form ref={form} onSubmit={sendEmail}>
            <div className="mb-4">
              <label htmlFor="user_name" className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input type="text" id="user_name" name="user_name" className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
            </div>
            <div className="mb-4">
              <label htmlFor="user_email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input type="email" id="user_email" name="user_email" className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
              <textarea id="message" name="message" rows={4} className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500" required></textarea>
            </div>
            <button type="submit" className="w-full px-6 py-2 text-white bg-cyan-600 rounded-lg hover:bg-cyan-700">
              Send Message
            </button>
            {status && <p className="mt-4 text-center">{status}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;