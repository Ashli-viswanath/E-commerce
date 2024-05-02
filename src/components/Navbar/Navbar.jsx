import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import logo from "../../assets/commerce.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import useStyles from "./styles";
const Navbar = ({totalItems}) => {
    const classes = useStyles();
  return (
    

    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img
              src={logo}
              alt="Commerce.js"
              height="25px"
              className={classes.image}
            />
            commerce.js
          </Typography>
          <div className={classes.grow} />
          <div className={classes.button}>
            <IconButton aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
