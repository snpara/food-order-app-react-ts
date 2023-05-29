import styles from "./CartItem.module.css";

export type CartItemType = {
  id: string;
  name: string;
  price: number;
  amount: number;
};

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
  onAdd: () => void;
}

const CartItem: React.FC<CartItemProps> = (props) => {
  const price = `$${props.item.price.toFixed(2)}`;

  return (
    <li className={styles["cart-item"]}>
      <div>
        <h2>{props.item.name}</h2>
        <div className={styles["summary"]}>
          <span className={styles["price"]}>{price}</span>
          <span className={styles["amount"]}>x {props.item.amount}</span>
        </div>
      </div>
      <div className={styles["actions"]}>
        <button onClick={props.onRemove}>-</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
