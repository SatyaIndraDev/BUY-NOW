import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";

import ProductList  from "../pages/ProductList ";





// import Login from "../Component/Login";


import { AdminPage } from "../pages/AdminPage";
import Login from "../pages/Login";
import PrivateRoutes from "./PrivateRoutes";

import PaymentPage from "../pages/PaymentPage";
import CartPage from "../pages/CartPage";
import ShoppingCart from "../pages/ShoppingCart";




function AllRoutes() {
  return (
    <Routes>

            <Route path = '/' element = {<Home />} />

            <Route path = '/mens' element = {  <ProductList />} />
            

            <Route path = '/cart' element = {<CartPage />} />

           
            <Route path = '/login' element = {<Login/>} />

            <Route path = '/payment' element = {<PaymentPage />} />

            <Route path = '/admin' element = {<PrivateRoutes><AdminPage /></PrivateRoutes>} />
            {/* <Route path="/payment" component={<PaymentPage />} /> */}



          

    </Routes>
  );
}

export default AllRoutes;
