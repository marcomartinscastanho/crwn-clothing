import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

export const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { clearItemFromCart, removeItemFromCart, addItemToCart } = useContext(CartContext);

  const handleClearItem = () => clearItemFromCart(cartItem);
  const handleDecrementItem = () => removeItemFromCart(cartItem);
  const handleIncrementItem = () => addItemToCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={handleDecrementItem}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={handleIncrementItem}>
          &#10095;
        </div>
      </span>
      <span className="price">${price}</span>
      <div className="remove-button" onClick={handleClearItem}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
