import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";

import Product from "../pages/Product";

import Cart from "../pages/Cart"

import Admin from "../pages/Admin";

import Login from "../Login/Login";


function AllRoutes() {
  return (
    <Routes>

            <Route path = '/' element = {<Home />} />

            <Route path = '/product' element = {<Product />} />

            <Route path = '/cart' element = {<Cart />} />

           
            <Route path = '/login' element = {<Login />} />
            <Route path = '/admin' element = {<Admin />} />




          

    </Routes>
  );
}

export default AllRoutes;
