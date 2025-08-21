import React from "react";
import {Sidebar, Banner } from "../../components";
const Home = () => {
  return (
    <div className="w-main flex">
      <div className='border w-main h-[11px] py-[50px] w-[30%] flex-auto'>
      <Sidebar />
      <span>deal Daily</span>
      </div>
      
      <div className='border w-main h-[11px] py-[50px] pl-5 w-[70%] flex-auto'>
      <Banner />
      <span>Items</span>
      </div>
    </div>

  );
};

export default Home;
