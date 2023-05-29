import { ReactNode, useReducer } from "react";

import CartContext from "./CartContext";
import { CartItemType } from "../components/Cart/CartItem";

interface CartState {
  items: CartItemType[];
  totalAmount: number;
}

enum CartActionType {
  ADD_CART_ITEM = "ADD_CART_ITEM",
  REMOVE_CART_ITEM = "REMOVE_CART_ITEM",
}

type AddCartAction = {
  type: typeof CartActionType.ADD_CART_ITEM;
  item: CartItemType;
};

type RemoveCartAction = {
  type: typeof CartActionType.REMOVE_CART_ITEM;
  id: string;
};

type CartActionTypes = AddCartAction | RemoveCartAction;

const defaultCartState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state: CartState, action: CartActionTypes) => {
  switch (action.type) {
    case CartActionType.ADD_CART_ITEM:
      const addedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;
      const existingCartItemToAddIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const exitstingCartItemToAdd = state.items[existingCartItemToAddIndex];

      let addedItemList;
      if (exitstingCartItemToAdd) {
        const addedItem = {
          ...exitstingCartItemToAdd,
          amount: exitstingCartItemToAdd.amount + action.item.amount,
        };
        addedItemList = [...state.items];
        addedItemList[existingCartItemToAddIndex] = addedItem;
      } else {
        addedItemList = state.items.concat(action.item);
      }

      return {
        items: addedItemList,
        totalAmount: addedTotalAmount,
      };

    case CartActionType.REMOVE_CART_ITEM:
      const existingCartItemToRemoveIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItemToRemove = state.items[existingCartItemToRemoveIndex];
      const removedTotalAmount = state.totalAmount - existingItemToRemove.price;
      let removedItemList;
      if (existingItemToRemove.amount === 1) {
        removedItemList = state.items.filter((item) => item.id !== action.id);
      } else {
        const removedItem = {
          ...existingItemToRemove,
          amount: existingItemToRemove.amount - 1,
        };
        removedItemList = [...state.items];
        removedItemList[existingCartItemToRemoveIndex] = removedItem;
      }

      return {
        items: removedItemList,
        totalAmount: removedTotalAmount,
      };

    default:
      return defaultCartState;
  }
};

interface CartProviderProps {
  children: ReactNode;
}

const CartProvider: React.FC<CartProviderProps> = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item: CartItemType) => {
    dispatchCartAction({ type: CartActionType.ADD_CART_ITEM, item: item });
  };

  const removeCartFromCartHandler = (id: string) => {
    dispatchCartAction({ type: CartActionType.REMOVE_CART_ITEM, id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeCartFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
