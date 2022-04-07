import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout.styles.scss";

export const Checkout = () => {
  const { cartItems, removeItemFromCart, addItemToCart } = useContext(CartContext);

  return (
    <div>
      <h1>I am the Checkout page</h1>
      <div>
        {cartItems.map((cartItem) => (
          <div key={cartItem.id}>
            <h2>{cartItem.name}</h2>
            <span
              onClick={() => {
                removeItemFromCart(cartItem);
              }}
            >
              {"< "}
            </span>
            <span>{cartItem.quantity}</span>
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
