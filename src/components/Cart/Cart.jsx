import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import useStyles from "./styles";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";
const Cart = ({
  cart,
  handleEmptyCart,
  handleRemoveFromCart,
  handleUpdateCartQty,
}) => {
  const classes = useStyles();
  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        You have no items in your shopping Cart
        <Link to="/" className={classes.link}>
          Start adding some!
        </Link>
      </Typography>
    );
  };

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {cart &&
            cart.line_items.map((item) => (
              <Grid item xs={12} sm={4} key={item.id}>
                <CartItem
                  item={item}
                  onUpdateCartQty={handleUpdateCartQty}
                  onRemoveFromCart={handleRemoveFromCart}
                />
              </Grid>
            ))}
        </Grid>

        <div className={classes.cardDetails}>
          <Typography variant="h4">
            Subtotal: {cart.subtotal.formatted_with_symbol}
          </Typography>

          <div>
            <Button
              className={classes.emptyButton}
              size="large"
              type="button"
              variant="contained"
              color="secondary"
              onClick={handleEmptyCart}
            >
              Empty Cart
            </Button>
            <Button
              component={Link}
              to="/checkout"
              className={classes.checkoutButton}
              size="large"
              type="button"
              variant="contained"
              color="primary"
            >
              Checkout
            </Button>
          </div>
        </div>
      </>
    );
  };

  if (!cart || !cart.line_items) return <div>Loading</div>;

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>

      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
