import { Grid } from "@mui/material";
import React from "react";
import Product from "./Product/Product";


const products = [
  { id: 1, name: "Shoes", description: "Running shoes" , price: 100},
  { id: 2, name: "MacBook Pro", description: "Apple laptop" , price: 200},
];

const Products = () => {
  return (
    <main>
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
            
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
