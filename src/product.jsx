import React ,{ useEffect, useState }from "react";
import Navbar from "./components/Navbar.jsx";
import Card  from "./components/Card.jsx";
function product() {
    const [products, setProducts] = useState([]);

    const getdata = async() => {
        const response =await fetch("http://localhost:8080/user");
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

export default product