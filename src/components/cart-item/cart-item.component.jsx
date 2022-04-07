//

import "./cart-item.styles.scss";

export const CartItem = ({ cartItem }) => {
  const { name, quantity } = cartItem;
  return (
    <div className="cart-item">
      <h2>{name}</h2>
      <span>{quantity}</span>
    </div>
  );
};

export default CartItem;
