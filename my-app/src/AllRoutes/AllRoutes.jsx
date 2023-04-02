import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";

import Product from "../pages/MensProduct";

import Cart from "../pages/Cart"

import Admin from "../pages/Admin";

import Login from "../Login/Login";

import PrivateRoutes from "../PrivateRoutes"

function AllRoutes() {
  return (
    <Routes>

            <Route path = '/' element = {<Home />} />

            <Route path = '/mens' element = {  <Product  />} />
            

            <Route path = '/cart' element = {<Cart />} />

           
            <Route path = '/login' element = {<Login />} />
            <Route path = '/admin' element = {<PrivateRoutes><Admin /></PrivateRoutes>} />




          

    </Routes>
  );
}

export default AllRoutes;
