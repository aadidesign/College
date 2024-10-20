// pages/404.js

import React from 'react';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-6">Page Not Found</p>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>
        {/* Remove the <a> tag inside Link */}
        <Link href="/" className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg hover:bg-indigo-700 transition duration-300">
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
