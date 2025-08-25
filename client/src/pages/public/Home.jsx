import React from "react";
import {Sidebar, Banner } from "../../components";
const Home = () => {
  return (
    <div className="w-main flex">
      <div className=' w-main h-[11px] py-[5px] w-[30%] flex-auto'>
      <Sidebar />
      </div>
      <div className=' w-main h-[11px] py-[5px] pl-5 w-[75%] flex-auto'>
      <Banner />
      </div>
    </div>

  );
};

export default Home;
