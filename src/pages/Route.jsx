 import React from 'react'
 import {BrowserRouter,Route,Routes} from 'react-router-dom'
 import Product from "./product";
 import Details from '../components/Details.jsx';
 import Login from '../components/Login.jsx';
 import Addtocart from './Addtocart.jsx';
 import Home from '../components/Home.jsx';
import ProductTable from './productTable.jsx';
 import CategoryPage from './CategoryPage.jsx';
 

 export default function Router() {
   return (
     <>
     <BrowserRouter>
     <Routes>
        <Route path="/" element={<Product/>}/>
        <Route path="/details/:id" element ={<Details/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Addtocart" element={<Addtocart/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/ProductTable" element={<ProductTable/>} />
        <Route path='/CategoryPage' element={<CategoryPage/>} />
     </Routes>
     </BrowserRouter>
     </>
   )
 }
 
 