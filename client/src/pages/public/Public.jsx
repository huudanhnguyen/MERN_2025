import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Header, Navigation} from "../../components";

const Public = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <Navigation />
      <div className="w-full flex flex-col justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default Public;
