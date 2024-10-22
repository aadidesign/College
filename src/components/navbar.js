import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md  px-8 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        <div className='flex items-center justify-center'>
          <Image src="/Images/logo.webp" alt="logo" width={100} height={100} />
          <p className='mx-2 text-black'>Pimpri Chinchwad College of Engineering - PCCOE</p>
        </div>
        <ul className="flex space-x-6 text-blue-900">
          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link href="/Attendance" className="hover:text-blue-600">Attendance</Link></li>
          <li><Link href="/calendar" className="hover:text-blue-600">calendar</Link></li>
          <li><Link href="/createevent" className="hover:text-blue-600">createevent</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
