 import React from 'react'
 import {BrowserRouter,Route,Routes} from 'react-router-dom'
 import Product from "./product";
 import Details from './components/Details';
 import Login from './components/Login';
 import Addtocart from './aDDTOCART.JSX';
 import Home from './components/Home';
 import Table from './Table';
 

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
        <Route path="/Table" element={<Table/>} />
     </Routes>
     </BrowserRouter>
     </>
   )
 }
 
 