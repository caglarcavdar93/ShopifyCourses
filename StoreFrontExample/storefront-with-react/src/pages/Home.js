import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext";
function Home() {
  const { fetchAllProducts, products } = useContext(ShopContext);
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  if (!products) return <div>Loading...</div>;

  return (
    <div>
      {products.map((product) => {
        return <h1>{product.title}</h1>;
      })}
    </div>
  );
}

export default Home;
