import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Header, Navigation, TopHeader, Footer } from "../../components";

const Public = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <TopHeader />
      <Header />
      <Navigation />
      <div className="w-full flex flex-col justify-center items-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Public;
