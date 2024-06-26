import React from "react";
import Review from "./Review";
import { Divider, Typography } from "@mui/material";
import { CardElement, Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PUBLIC_KEY);
const PaymentForm = ({checkoutToken, backStep, onCaptureCheckout,nextstep ,timeOut}) => {
  const handleSubmit = async(e, elements, stripe) => {
    e.preventDefault();
    if(!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement
    })
    if(error) {console.log(error)}
    else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email
        },
        shipping: {
          name: "Primary",
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry
        },
        fulfillment: {
          shipping_method: shippingData.shippingOption
        },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id
          }
        }
      } 
      onCaptureCheckout(checkoutToken.id, orderData);
      timeOut();
      nextstep();
    }
  }
  return (
    <div>
      <Review checkoutToken={checkoutToken}/>
      <Divider/>
      <Typography variant="h6" gutterBottom style={{ marginTop: "20px 0" }}>Payment method</Typography>
      <Elements stripe={stripePromise}>
<ElementsConsumer>
  {({ elements, stripe }) => (
    <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
      <CardElement/>
      <br/> <br/>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={backStep}>Back</Button>
        <Button type="submit" variant="contained" color="primary" disabled={!stripe}>
          Pay {checkoutToken.live.subtotal.formatted_with_symbol}
        </Button>
      </div>
    </form>
  )}
</ElementsConsumer>
      </Elements>
    </div>
  )
};

export default PaymentForm;
