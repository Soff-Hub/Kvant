import { Item, addItemWithWishst, removeItem } from './wishst.utils';

type AddItemAction = { type: 'ADD_ITEM_WITH_WISHST'; item: Item };
type RemoveItemAction = { type: 'REMOVE_ITEM_WISHST'; id: Item['id'] };

export type Action = AddItemAction | RemoveItemAction;

export interface State {
  items: Item[];
}

export const initialState: State = {
  items: [],
};

export function cartReducerWishst(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_ITEM_WITH_WISHST': {
      const items = addItemWithWishst(state.items, action.item);
      return generateFinalState(state, items);
    }
    case 'REMOVE_ITEM_WISHST': {
      const items = removeItem(state.items, action.id);
      return generateFinalState(state, items);
    }
    default:
      return state;
  }
}

const generateFinalState = (state: State, items: Item[]) => {
  return {
    ...state,
    items: items,
  };
};
