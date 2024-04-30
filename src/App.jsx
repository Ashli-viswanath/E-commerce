import { useEffect, useState } from "react"
import Navbar from "./components/Navbar/Navbar"
import Products from "./components/Products/Products"
import {commerce} from './lib/commerce'


function App() {

const [products, setProducts] = useState([])
const fetchProducts = async () => {
  const { data } = await commerce.products.list();
  setProducts(data)
}
useEffect(() => {
  fetchProducts()
},[])
console.log(products)
  return (
    <>
    <Navbar/>
  <Products products={products}/>
    </>
  )
}

export default App
