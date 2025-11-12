import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";

function Home() {
  const [ Categories, setCategories ] = useState([]);
  const [  products, setProducts    ] = useState ([]);
  const [ loading,   setLoading  ]  = useState(true);


  // Fetch categories

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch("http://localhost:8080/user/category"),
          fetch("http://localhost:8080/user"),
        ]);

        const [catData, prodData]= await Promise.all([
          catRes.json(),
          prodRes.json(),
        ]);

        setCategories(catData);
        setproducts(prodData);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchData();
  },[]);
  return (
   <div className="w-full min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white font-sans">
    {/* Navbar */}
    <nav className="w-full bg-gradient-to-r from-blue-700 via-blue-600 to indigo-600 text-white flex-col md:flex-row justify-between items-center px-8 py-4 shadow-lg">
      <h1 className="text-3xl font-bold tracking-wide mb-2 md:mb-0">
        <span className="text-yellow-300"> Shopeaze</span>
      </h1>

    <input type="text"
    placeholder= 'Search amazing products...'
     className="w-full md:w-[35%] p-2 rounded-md text-black bg-white placeholder:-gray-500 outline-none shadow-sm"/>
     

     <ul className="flex gap-8 mt-3 md:mt-0 text-lg font-medium">
      {["Home", "Products", "Cart", "profile",].map((item) => (
        <li
          key={item}
         className="cursor-pointer hover:text-yellow-300 transition-all duration-200">
          {item}
         </li>
      ))}
     </ul>
    </nav>

    {/* Hero section */}

    <section className="flex flex-col md:flex-row justify-between items-center py-16 px-8 md:px-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="md:w-1/2 space-y-6 text-center md:text-left animate-fadeIn">
      <h2 className="text-5xl font-extrabold text-gray-800 leading-snug">
        Welcome to{""} 
        <span className="text-blue-600 drop-shadow-lg">Shopeaze</span>
        </h2>
        <p className="text-gray-600 text-lg">
          Discover high-quality products and exclusive deals - all in love 
          place!
        </p>
        <button className="bg-blue-600 hover:700 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
           Shop Now
        </button>
        </div>

        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe9C1q6Eh8Hy6lJZ-mQTFLP5rhsmlKJ0EkPWNDnsJzwe74r8VLLkFmWHX_2G5j7qbQffI&usqp=CAU" alt="shopping" 
        className='w-70 md:w-[450px] mt-8 md:mt-0'/>
    </section>

    {/*categories section */}

    <section className="py-16 px-8 md:px-16 bg-white">
      <h3 className="text-3xl font-bold text-center mb-10 text-black">Browse by Categories</h3>
   
    { loading ? (
      <p className="text-center text-black">Loading...</p>
    ): Categories.length === 0 ? (
      <p className="text-center text-gray-500">No categories available</p>
    ):(
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
        {Categories.map((cat) => (
          <div
          key={cat._id} 
          className="flex flex-col items-center p=-4 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
            <img 
            src={cat.image}
             alt={cat.title}
             className='w-24 h-24 object-cover rounded-full mb-3 border-2 border-blue-200'
              />
              <h4 className="text-md font-semibold text-gray-700">
                {cat.title}
              </h4>
          </div>
        ))}
      </div>
    )}
    </section>
    {/* featured products section */}
   <section className="py-16 px-8 md:px-16 bg-gray-50">
      <h3 className="text-3xl font-bold text-center mb-10 text-gray-800">Featured Products</h3>
   
    { loading ? (
      <p className="text-center text-gray-500">Loading...</p>
    ): products.length === 0 ? (
      <p className="text-center text-gray-500">No products available</p>
    ):(
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10">
        {Categories.map((item) => (
          <div
          key={item._id} 
          className="bg-white rounded-xl hover:shadow-2xl transition-all duration-300  overflow-hidden group">
            <img 
            src={item.image}
             alt={item.title}
                   className='rounded-t-xl w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300'
                    loading="lazy"
             />
              <h4 className="text-lg font-semibold text-gray-800 mb-1">
                {item.title}
              </h4>
          </div>
        ))}
      </div>
    )}
    </section>
   </div>
  )
}

export default Home