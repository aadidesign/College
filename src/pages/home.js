// pages/index.js
import React from 'react';
import Navbar from '../components/navbar';
import Sidebar from '../components/home/sidebar';
import Hero from '../components/home/hero';

const HomePage = () => {
  return (
    <div>
      {/* <Navbar/> */}
      <Sidebar/>
      <Hero/>
    </div>
  );
};

export default HomePage;
