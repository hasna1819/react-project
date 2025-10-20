import React ,{ useEffect, useState }from "react";
import Navbar from "./components/Navbar.jsx";
import Card  from "./components/Card.jsx";
function Home() {
    const [products, setProducts] = useState([]);

    const getdata = async() => {
        const response =await fetch("https://fakestoreapi.com/products");
        const data =await response.json();
        setProducts(data); 
        console.log(data); 
    }
    useEffect(() =>{
        getdata()
    },[])
  return (
    <>
<Navbar/>
<div className="flex flex-wrap justify-center gap-[6px] mt-6 ">
    {products.map((item) =>(
       <Card 
       key={item.id}
       title={item.title}
       price={item.price}
       image={item.image}/>

    ))}
</div>
    </>
  )
}

export default Home