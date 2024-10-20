// pages/index.js
import React from 'react';
import Navbar from 'root/components/navbar';
import Sidebar from 'root/components/home/sidebar';
import Hero from 'root/components/home/hero';

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <Hero/>
    </div>
  );
};

export default HomePage;
