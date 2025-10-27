 import React from 'react'
 import {BrowserRouter,Route,Routes} from 'react-router-dom'
 import Home from "./Home";
 import Details from './components/Details';
 import Login from './components/Login';
 import Addtocart from './aDDTOCART.JSX';

 export default function Router() {
   return (
     <>
     <BrowserRouter>
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/details/:id" element ={<Details/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Addtocart" element={<Addtocart/>} />
     </Routes>
     </BrowserRouter>
     </>
   )
 }
 
 