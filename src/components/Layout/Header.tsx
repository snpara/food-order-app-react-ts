import { Fragment } from "react";

import styles from "./Header.module.css";

import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

interface HeaderProps {
  onShowCart: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <Fragment>
      <header className={styles["header"]}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
