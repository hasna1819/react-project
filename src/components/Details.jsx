import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Details() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const getData = async () => {
    if (!id) return; // safety check

    try {
      const res = await fetch(`http://localhost:8080/user/products/single/${id}`);
      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      setProduct(data.product); // data.product because your API returns { success, product }
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  return (
    <div>
      <h2>Details of {product.title}</h2>
      <img src={product.image} alt={product.title} width={300} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category?.title}</p>
    </div>
  );
}

export default Details;
