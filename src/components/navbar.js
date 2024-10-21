import React from 'react';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md  px-8 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        <div className='flex items-center justify-center'>
          <Image src="/Images/logo.webp" alt="logo" width={100} height={100} />
          <p className='mx-2 text-black'>Pimpri Chinchwad College of Engineering - PCCOE</p>
        </div>
        <ul className="flex space-x-6 text-blue-900">
          <li><a href="/" className="hover:text-blue-600">Home</a></li>
          <li><a href="#about" className="hover:text-blue-600">About</a></li>
          <li><a href="#services" className="hover:text-blue-600">Services</a></li>
          <li><a href="#contact" className="hover:text-blue-600">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
