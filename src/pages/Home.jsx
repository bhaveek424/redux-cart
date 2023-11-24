import React from 'react';
import Products from '../components/Products';
import Sidebar from '../components/Sidebar';

const Home = () => {
  return (
    <>
      {/* Searchbar */}
      <div className="flex">
        {/* Sidebar */}
        {/* <Sidebar /> */}
        {/* Products */}
        <Products />
      </div>
    </>
  );
};

export default Home;
