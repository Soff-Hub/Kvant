'use client';

import React from 'react';
import { cartReducerWishst, State, initialState } from './wishst.reducer';
import { Item } from './wishst.utils';
import { useLocalStorage } from '@utils/use-local-storage';

interface CartProviderState extends State {
  addItemToWishst: (item: Item) => void;
  removeItemFromCart: (id: Item['id']) => void;
}

export const cartContext = React.createContext<CartProviderState | undefined>(
  undefined,
);

cartContext.displayName = 'CartContext';

export const useCartWishtlists = () => {
  const context = React.useContext(cartContext);
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`);
  }
  return context;
};

export function CartProviderWishstLists(props: React.PropsWithChildren<any>) {
  const [savedWisht, saveWisht] = useLocalStorage(
    `uminex-wisht`,
    JSON.stringify(initialState),
  );
  const [stateWisht, dispatchWist] = React.useReducer(
    cartReducerWishst,
    JSON.parse(savedWisht!),
  );

  React.useEffect(() => {
    saveWisht(JSON.stringify(stateWisht));
  }, [stateWisht, saveWisht]);

  const addItemToWishst = (item: Item) =>
    dispatchWist({ type: 'ADD_ITEM_WITH_WISHST', item });

  const removeItemFromCart = (id: Item['id']) =>
    dispatchWist({ type: 'REMOVE_ITEM_WISHST', id });

  const value = React.useMemo(
    () => ({
      ...stateWisht,
      addItemToWishst,
      removeItemFromCart,
    }),
    [stateWisht],
  );
  return <cartContext.Provider value={value} {...props} />;
}
