export interface Item {
  id: string | number;
  price: number;
  image: string;

}

export function addItemWithWishst(
  items: Item[],
  item: Item
) {
  return [...items, item];
}

// export function removeItem(items: Item[], id: Item['id']) {
//   return items.filter((existingItem) => existingItem.id !== id);
// }

