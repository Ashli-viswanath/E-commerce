import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { commerce } from "./lib/commerce";
import Cart from "./components/Cart/Cart";
import {Route, Routes } from "react-router-dom";
import Products from "./components/Products/Products";
function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  console.log(cart);
  return (
    <>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route exact path="/" element={ <Products products={products} onAddToCart={handleAddToCart} />}/>
          <Route exact path="/cart" element={<Cart cart={cart} />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
