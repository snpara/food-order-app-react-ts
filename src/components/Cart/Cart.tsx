import { useContext } from "react";

import Modal from "../UI/Modal";
import CartContext from "../../store/CartContext";
import CartItem, { CartItemType } from "./CartItem";

import styles from "./Cart.module.css";

interface CartProps {
  onClose: () => void;
}

const Cart: React.FC<CartProps> = (props) => {
  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const cartItemRemoveHandler = (id: string) => {
    cartContext.removeItem(id);
  };

  const cartItemAddHandler = (item: CartItemType) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles["total"]}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles["actions"]}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={styles["button"]}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
