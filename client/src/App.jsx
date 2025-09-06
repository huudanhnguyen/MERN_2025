import React from "react";
import { Routes, Route } from "react-router-dom";
import path from "./utils/path";

// import các page
import Public from "./pages/public/Public";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Products from "./pages/public/Products";
import DetailProduct from "./pages/public/DetailProduct";
import Blogs from "./pages/public/Blogs";
import FAQs from "./pages/public/FAQs";
import OurServices from "./pages/public/OurServices";
import ForgotPassword from "./pages/public/ForgotPassword";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Public />}>
        <Route index element={<Home />} />
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.REGISTER} element={<Register />} />
        <Route path={path.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={path.PRODUCTS} element={<Products />} />
        <Route path={path.DETAIL_PRODUCT__ID__SLUG} element={<DetailProduct />} />
        <Route path={path.BLOGS} element={<Blogs />} />
        <Route path={path.OUR_SERVICES} element={<OurServices />} />
        <Route path={path.FAQs} element={<FAQs />} />
        <Route path={path.NOT_FOUND} element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
