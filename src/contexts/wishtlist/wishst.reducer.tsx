import {
  Item,
  addItemWithWishst,
  // removeItem,
} from './wishst.utils';

type Action = { type: 'ADD_ITEM_WITH_WISHST'; item: Item };
// | { type: 'REMOVE_ITEM'; id: Item['id'] }

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
    // case 'REMOVE_ITEM': {
    //   const items = removeItem(state.items, action.id);
    //   return generateFinalState(state, items);
    // }
  }
}

const generateFinalState = (state: State, items: Item[]) => {
  return {
    ...state,
    items: items,
  };
};
