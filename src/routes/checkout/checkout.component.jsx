import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout.styles.scss";

export const Checkout = () => {
  const { cartItems, addItemToCart } = useContext(CartContext);

  return (
    <div>
      <h1>I am the Checkout page</h1>
      <div>
        {cartItems.map((cartItem) => (
          <div key={cartItem.id}>
            <h2>{cartItem.name}</h2>
            <span>{cartItem.quantity}</span>
            <span>{"< "}</span>
            <span
              onClick={() => {
                addItemToCart(cartItem);
              }}
            >
              {" >"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checkout;
