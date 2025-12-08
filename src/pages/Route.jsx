import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Product from "./Product";
import Details from "../components/Details.jsx";
import Login from "../components/Login.jsx";
import Signup from "./Signup.jsx";
import Profile from "./Profile.jsx";
import AddToCart from "./AddToCart.jsx";
import Cart from "./Cart.jsx";
import Address from "./Address.jsx"; // Make sure you create this component
import Proceed from "./Proceed.jsx";
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
        {/* MAIN PRODUCT LIST */}
        <Route path="/" element={<Product />} />

        {/* PRODUCT DETAILS */}
        <Route path="/details/:id" element={<Details />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* USER */}
        <Route path="/profile" element={<Profile />} />

        {/* CART */}
        <Route path="/addtocart" element={<AddToCart />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<Address />} />
        <Route path="/proceed" element={<Proceed />} />
        <Route path="/orderdetails" element={<OrderDetails />} />

        {/* OTHER PAGES */}
        <Route path="/home" element={<Home />} />

        {/* ADMIN + CATEGORY */}
        <Route path="/producttable" element={<ProductTable />} />
        <Route path="/categorypage" element={<CategoryPage />} />

        {/* SINGLE PRODUCT PAGES */}
        <Route path="/productdetail/:id" element={<ProductDetail />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
      </Routes>
    </BrowserRouter>
  );
}
