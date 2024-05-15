import { Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { commerce } from "../../../lib/commerce";
const steps = ["Shipping Address", "Payment Details"];
const Checkout = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const classes = useStyles();
  useEffect(() => {
    const generateToken = async () => {
      try {
        if (cart.id) {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: "cart",
          });
          console.log(token);
          console.log(cart.id);

          setCheckoutToken(token);
        }
      } catch (error) {
        console.log(error);
      }
    };

    generateToken();
  }, [cart.id]);
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} />
    ) : (
      <PaymentForm />
    );
  const Confirmation = () => <div> Confirmation </div>;
  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            {" "}
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
