import CartIcon from "../Cart/CartIcon";

import styles from "./HeaderCartButton.module.css";

interface HeaderCardButtonProps {}

const HeaderCartButton: React.FC<HeaderCardButtonProps> = (props) => {
  return (
    <button className={styles["button"]}>
      <span className={styles["icon"]}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles["badge"]}>3</span>
    </button>
  );
};

export default HeaderCartButton;
