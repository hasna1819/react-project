import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Product from "./product";
import Details from "../components/Details.jsx";
import Login from "../components/Login.jsx";
import Addtocart from "./Addtocart.jsx";
import Home from "../components/Home.jsx";
import ProductTable from "./productTable.jsx";
import CategoryPage from "./CategoryPage.jsx";
import ProductDetail from "./ProductDetails.jsx";
import SingleProduct from "./SingleProduct";
import Signup from "./Signup.jsx";
import Profile from "./Profile.jsx";
import Cart from "./Cart.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MAIN PRODUCT LIST */}
        <Route path="/" element={<Product />} />

        {/* PRODUCT DETAILS */}
        <Route path="/details/:id" element={<Details />} />

        {/* AUTH */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />

        {/* USER */}
        <Route path="/profile" element={<Profile />} />

        {/* CART */}
        <Route path="/Addtocart" element={<Addtocart />} />
        <Route path="/Cart" element={<Cart />} />

        {/* OTHER PAGES */}
        <Route path="/Home" element={<Home />} />

        {/* ADMIN + CATEGORY */}
        <Route path="/ProductTable" element={<ProductTable />} />
        <Route path="/CategoryPage" element={<CategoryPage />} />

        {/* IMPORTANT ROUTES USED IN YOUR SINGLE PRODUCT PAGE */}
        <Route path="/ProductDetail/:id" element={<ProductDetail />} />
        <Route path="/SingleProduct/:id" element={<SingleProduct />} />
      </Routes>
    </BrowserRouter>
  );
}
