import { createContext } from "react";

import { CartItemType } from "../components/Cart/CartItem";

interface CartContextOptions {
  items: CartItemType[];
  totalAmount: number;
  addItem: (item: CartItemType) => void;
  removeItem: (id: string) => void;
}

const CartContext = createContext<CartContextOptions>({
  items: [],
  totalAmount: 0,
  addItem: (item: CartItemType) => {},
  removeItem: (id: string) => {},
});

export default CartContext;
