import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Product from "./product";  // <-- FIXED IMPORT
import Details from "../components/Details.jsx";
import Login from "../components/Login.jsx";
import Signup from "./Signup.jsx";
import Profile from "./Profile.jsx";
import AddToCart from "./Addtocart.jsx";
import Cart from "./Cart.jsx";
import Address from "./Address.jsx";
import Proceed from "./proceed.jsx";  // <-- FIX CAPITAL
import OrderDetails from "./Orderdetails.jsx";
import Home from "../components/Home.jsx";
import ProductTable from "./ProductTable.jsx";
import CategoryPage from "./CategoryPage.jsx";
import ProductDetail from "./ProductDetails.jsx";
import SingleProduct from "./Singleproduct.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Product />} /> */}
        {/* <Route path="/product" element={<Product />} />   */}

        <Route path="/details/:id" element={<Details />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/addtocart" element={<AddToCart />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<Address />} />
        <Route path="/proceed" element={<Proceed />} />
        <Route path="/orderdetails" element={<OrderDetails />} />

        <Route path="/" element={<Home />} />

        <Route path="/producttable" element={<ProductTable />} />
        <Route path="/categorypage" element={<CategoryPage />} />

        <Route path="/productdetail/:id" element={<ProductDetail />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
      </Routes>
    </BrowserRouter>
  );
}
