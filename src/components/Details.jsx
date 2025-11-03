import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Details() {
  const [Product, SetProduct] = useState({});
  const { id } = useParams();
  const GetData = async () => {
    let res = await fetch(`http://localhost:8080/user}`);
    let data = await res.json();
    SetProduct(data);
  };
  useEffect(() => {
    GetData();
  }, []);
  return (
    <div>
      Details of {id}
      <div>{Product.title}</div>
      <img src={Product.image} alt="" />
      <p>{Product.description}</p>
    </div>
  );
}

export default Details;
